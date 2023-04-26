import React, { useEffect, useState } from "react";
import "./chat.css";
import ChatBox from "./ChatBox/ChatBox";
import Contact from "./Contact/Contact";
import { useNavigate } from "react-router-dom";

const Chat = ({ socket }) => {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  const [chatUserAvatar, setChatUserAvatar] = useState("");

  return (
    <div className="chat-container">
      <Contact setChatUserAvatar={setChatUserAvatar} />
      <ChatBox chatUserAvatar={chatUserAvatar} socket={socket} />
    </div>
  );
};

export default Chat;
