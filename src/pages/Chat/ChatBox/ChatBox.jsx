import React, { useState } from "react";
import "./chatBox.css";
import ChatContent from "../ChatContent/ChatContent";
import Logout from "../Logout/Logout";
import ChatInput from "../Chat Input/ChatInput";

const ChatBox = ({ chatUserAvatar, socket }) => {
  const [typingStatus, setTypingStatus] = useState("");

  return (
    <div className="chatBox-container">
      <Logout chatUserAvatar={chatUserAvatar} typingStatus={typingStatus} />

      <ChatContent
        socket={socket}
        chatUserAvatar={chatUserAvatar}
        setTypingStatus={setTypingStatus}
      />

      <ChatInput chatUserAvatar={chatUserAvatar} socket={socket} />
    </div>
  );
};

export default ChatBox;
