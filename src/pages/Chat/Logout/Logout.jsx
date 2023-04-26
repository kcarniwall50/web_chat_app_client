import React, { useEffect, useState } from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";

const Logout = ({ chatUserAvatar, typingStatus }) => {
  const navigate = useNavigate();
  const loginUserId = JSON.parse(localStorage.getItem("loginUserId"));

  const [url, setUrl] = useState(JSON.parse(localStorage.getItem("userPair")));

  const logout = () => {
    localStorage.setItem("isLogin", false);

    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-avatar">
        <img src={chatUserAvatar.avatar} style={{ width: "32%" }} />
        <p>{chatUserAvatar.name}</p>
      </div>

      <div style={{ color: "white", fontSize: "0.8rem", padding: "0.0rem" }}>
        {/* <p>{typingStatus?.textMessage}</p> */}
        {typingStatus?.typerId !== loginUserId && (
          <code>{typingStatus?.textMessage}</code>
        )}
      </div>

      <div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
