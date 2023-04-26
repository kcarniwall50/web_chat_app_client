import React, { useEffect, useRef, useState } from "react";
import "./chatInput.css";
import { BiSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const backend_url = process.env.Backend_URL;

const ChatInput = ({ chatUserAvatar, socket }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const ref = useRef();

  const handleTyping = () => {
    const typer = {
      textMessage: `${JSON.parse(
        localStorage.getItem("loginUserName")
      )} is typing...`,
      typerId: JSON.parse(localStorage.getItem("loginUserId")),
    };

    socket.emit("typing", typer);
  };

  const stopTyping = () => socket.emit("stopTyping", false);

  const sendChat = async (e) => {
    e.preventDefault();
    // console.log(msg);
    if (msg.length < 1) {
      return toast.error("Please enter some texts");
    }

    if (msg.length > 0) {
      setMsg("");
    }
    const messages = {
      message: msg,
      senderId: JSON.parse(localStorage.getItem("loginUserId")),
      senderName: JSON.parse(localStorage.getItem("loginUserName")),
    };
    socket.emit("message", messages);

    try {
      const response = await axios.post(
        `${backend_url}/saveMessage`,
        { chatUserAvatar, msg },
        { withCredentials: true }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  // document.addEventListener("click",()=>{
  //   const stopTyping = () =>

  // })

  const smileEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += event.emoji;
    setMsg(message);
    // console.log(emojiObject, "yui", message, "oo", event)
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      socket.emit("stopTyping", false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // return () => {
    //     document.removeEventListener('click', handleClickOutside);
    // };
  }, []);

  return (
    <div className="chatInput-container">
      {showEmoji && (
        <div className="emoji">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            className="size"
            searchDisabled={true}
          />
        </div>
      )}

      <form onSubmit={sendChat} className="chat-form">
        <FaSmile
          className="emoji-smile"
          size="40"
          color="yellow"
          onClick={smileEmoji}
        />

        <input
          className="input-message"
          placeholder="send message..."
          type="text"
          onChange={(event) => setMsg(event.target.value)}
          value={msg}
          // defaultValue={msg}
          onKeyDown={handleTyping}
          onClick={stopTyping}
          ref={ref}
        />

        <button type="submit" className="input-message">
          <BiSend size="35" color="blue" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
