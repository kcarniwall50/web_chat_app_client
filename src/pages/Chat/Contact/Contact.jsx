import React, { useEffect, useState, useRef } from "react";
import "./contact.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

const backend_url = process.env.Backend_URL;

const Contact = ({ setChatUserAvatar }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const users = async () => {
      try {
        const response = await axios.get(`${backend_url}/getAllUsers`, {
          withCredentials: true,
        });
        // console.log("res", response.data, "kk");
        setUsers(response.data.allUsers);
        setCurrentUser(response.data.currentUser);
      } catch (e) {
        console.log("error", e);
      }
    };
    users();
  }, []);

  const imageClickHandler = (user) => {
    setChatUserAvatar(user);
  };

  return (
    <div className="contact-container">
      <div>
        <FaUsers size="35" style={{ color: "blue" }} />
      </div>

      <div className="users-scrollbar">
        {users?.map((user, index) => (
          <div
            key={index}
            className="user-icon"
            onClick={() => imageClickHandler(user)}
            tabIndex="756"
          >
            <img src={user.avatar} />
            <p>{user.name}</p>
          </div>
        ))}
      </div>

      <div className="currentUser-icon">
        <img src={currentUser?.avatar} />
        <p>{currentUser?.name}</p>
      </div>
    </div>
  );
};

export default Contact;
