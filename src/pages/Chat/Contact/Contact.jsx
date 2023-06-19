import React, { useEffect, useState } from "react";
import "./contact.css";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const Contact = ({ setChatUserAvatar }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const users = async () => {
      try {
        const response = await axios.get(`${backend_url}/getAllUsers`, {
          withCredentials: true,
        });
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

const setAvatar = ()=>{
  navigate('/setAvatar')
}

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
            <img src={user.avatar} alt='' />
            <p>{user.name}</p>
          </div>
        ))}
      </div>

      <div className="currentUser-icon" >
        <img  target="_blank"  onClick={setAvatar } src={currentUser?.avatar}  alt='' style={{cursor:'pointer'}}  />
        <p>{currentUser?.name}</p>
      </div>
    </div>
  );
};

export default Contact;
