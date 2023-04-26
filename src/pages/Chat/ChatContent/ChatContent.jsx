import React, { useEffect, useRef, useState } from "react";
import "./chatContent.css";
import axios from "axios";

import socketClient from "socket.io-client";
const SERVER = process.env.Backend_URL;
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

  console.log("chat content rendered");
  const [receivedMessage, setReceivedMessage] = useState([]);

  const [allChats, setAllChats] = useState([]);

  const scrollNew = useRef();
  // const scrollOld = useRef();

  let allMessages = [];

  const loginUserId = JSON.parse(localStorage.getItem("loginUserId"));
  // console.log(loginUserId)

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));

    socket.on("typingResponseEnd", (data) => setTypingStatus(""));

    socket.on("chat-message", (newMessage) => {
      // console.log(newMessage, "oo");
      // console.log(receivedMessage, "pp")
      setReceivedMessage((state) => [...state, newMessage]);
      // console.log(...receivedMessage)
    });
  }, [socket]);

  let isUser = "";

  const [newUser, setNewUser] = useState();

  useEffect(() => {
    socket.on("newUserResponse", (data) => {
      // console.log("oo",data,  "ll")
      if (data.userId === JSON.parse(localStorage.getItem("loginUserId"))) {
        setNewUser("You Joined");
        // setReceivedMessage((state) => [...state, "you Joined"]);
      } else {
        setNewUser(`${data.userName}  Joined`);
        // setReceivedMessage((state) => [...state, `${data.userName} joined`]);
      }
    });

    socket.on("user-disconnected", (disconnectedUser) => {
      console.log("disconnected user", `${disconnectedUser}`, "...");

      setReceivedMessage((state) => [...state, disconnectedUser]);
    });
  }, [socket]);

  // chat history
  useEffect(() => {
    const getAllChats = async () => {
      try {
        const response = await axios.get(`${SERVER}/getAllChats`, {
          withCredentials: true,
        });
        // console.log(response.data);
        setAllChats(response.data.message);
        allMessages = response.data.message;
        // console.log("kk",typeof(allChats[1].users.sender),"ll")
        // console.log("pp",chatUserAvatar,"oo")
      } catch (e) {
        console.log(e);
      }
    };

    getAllChats();
  }, []);

  useEffect(() => {
    scrollNew.current?.scrollIntoView({ behavior: "smooth" });
    //  scrollNew.current.scrollIntoView(true); // false
    // scrollOld.current.scrollIntoView(false);
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
      <span
        style={{
          color: "white",
          padding: "0.1rem ",
          backgroundColor: "#D5CABD",
          margin: "0.5rem",
        }}
      >
        {formatDateFromTimestamp(date)}
      </span>
      <div className="chat-messages">
        {receivedMessage?.map((message, index) => (
          <div key={index} ref={scrollNew}>
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
                <p
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "9px",
                    margin: "0.2rem",
                    color: "blue",
                  }}
                >
                  {" "}
                  {message?.senderId === loginUserId ? (
                    <span>You</span>
                  ) : (
                    <span>{message?.senderName}</span>
                  )}{" "}
                </p>

                <p className="text">{message?.message}</p>

                <p
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "8px",
                    padding: "0.2rem",
                    color: "grey",
                  }}
                >
                  {" "}
                  {time()}
                </p>
              </div>
            </div>
            {/* <code style={{ fontSize: "10px" }}>
              <small>you</small>
            </code> */}
            {index === 0 && <p style={{ textAlign: "center" }}>{newUser}</p>}
          </div>
        ))}
      </div>
      <div />
    </div>
  );
};

export default ChatContent;
