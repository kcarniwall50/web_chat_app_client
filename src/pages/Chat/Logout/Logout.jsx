import React from "react";
import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGOUT } from "../../../RTK/state";

const Logout = ({ chatUserAvatar, typingStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserId = JSON.parse(localStorage.getItem("loginUserId"));

  const logout = () => {
    dispatch(SET_LOGOUT())

    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-avatar">
        <img src={chatUserAvatar.avatar} style={{ width: "32%" }} alt='' />
        <p>{chatUserAvatar.name}</p>
      </div>

      <div style={{ color: "white", fontSize: "0.8rem", padding: "0.0rem" }}>
        {typingStatus?.typerId !== loginUserId && (
          <code style={{ color: "black" }}>{typingStatus?.textMessage}</code>
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
