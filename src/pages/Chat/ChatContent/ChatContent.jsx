import React, { useEffect, useRef, useState } from "react";
import "./chatContent.css";
import socketClient from "socket.io-client";
const SERVER = process.env.REACT_APP_BACKEND_URL;
var socket = socketClient(SERVER);

const ChatContent = ({ setTypingStatus }) => {
  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(date) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    return (today = dd + "/" + mm + "/" + yyyy);
  }

  const date = Date.now();

  const [receivedMessage, setReceivedMessage] = useState([]);

  const scrollNew = useRef();

  const loginUserId = JSON.parse(localStorage.getItem("loginUserId"));

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      if (data.userId === JSON.parse(localStorage.getItem("loginUserId"))) {
        setReceivedMessage((state) => [...state, "You Joined"]);
      } else {
        setReceivedMessage((state) => [...state, `${data.userName}  Joined`]);
      }
    });

    socket.on("user-disconnected", (dropedUser) => {
      setReceivedMessage((state) => [...state, `${dropedUser} disconnected`]);
    });

    socket.on("typingResponse", (data) => setTypingStatus(data));

    socket.on("typingResponseEnd", (data) => setTypingStatus(""));

    socket.on("chat-message", (newMessage) => {
      setReceivedMessage((state) => [...state, newMessage]);
    });
  }, [socket]);

  useEffect(() => {
    scrollNew.current?.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessage]);

  const time = () => {
    var time = new Date();

    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="chat-content-conatiner">
      <span className="date-up">{formatDateFromTimestamp(date)}</span>
      <div className="chat-messages">
        {receivedMessage?.map((message, index) => (
          <div key={index} ref={scrollNew}>
            {message.message === undefined ? (
              <p
                style={{
                  textAlign: "center",
                  width: "160px",
                  backgroundColor: "grey",
                  color: "white",
                  marginInline: "auto",
                  padding: "0.2rem",
                  borderRadius: "4px",
                }}
              >
                {message}&nbsp;
                {<small style={{ fontSize: "8px" }}>{time()}</small>}
              </p>
            ) : (
              <div
                className={`message ${
                  message?.senderId === loginUserId ? "sended" : "recieved"
                }`}
              >
                <div
                  className={`content ${
                    message?.senderId === loginUserId ? "back1" : "back2"
                  }`}
                >
                  <p className="your-message">
                    {message?.senderId === loginUserId ? (
                      <span>You</span>
                    ) : (
                      <span>{message?.senderName}</span>
                    )}{" "}
                  </p>

                  <p className="text">{message?.message}</p>

                  <p className="others-message"> {time()}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div />
    </div>
  );
};

export default ChatContent;
