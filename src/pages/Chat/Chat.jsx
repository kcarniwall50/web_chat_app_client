import React, { useEffect, useState } from "react";
import "./chat.css";
import ChatBox from "./ChatBox/ChatBox";
import Contact from "./Contact/Contact";
const Chat = ({ socket }) => {

  const [chatUserAvatar, setChatUserAvatar] = useState("");

  return (
    <div className="chat-container">
      <Contact setChatUserAvatar={setChatUserAvatar} />
      <ChatBox chatUserAvatar={chatUserAvatar} socket={socket} />
    </div>
  );
};

export default Chat;
