import React, { useState } from "react";
import "./setAvatar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const backend_url = process.env.REACT_APP_BACKEND_URL;

const SetAvatar = ({ socket }) => {
  const navigate = useNavigate();

  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);

  function handleSprite(spritetype) {
    setSprite(spritetype);
  }

  function handleGenerate() {
    let x = Math.floor(Math.random() * 1000);
    setSeed(x);
  }

  const ProfileAvatar = async () => {
    const avatarURL = `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`;

    try {
      const res = await axios.patch(
        `${backend_url}/setAvatar`,
        { URL: avatarURL },
        { withCredentials: true }
      );
      if (res.status === 201) {
        toast.success("Avatar saved successfully");
      }
      localStorage.setItem("loginUserId", JSON.stringify(res.data._id));
      localStorage.setItem("loginUserName", JSON.stringify(res.data.name));

      socket.emit("new-user", {
        userName: res.data.name,
        userId: res.data._id,
        socketID: socket.id,
      });

      localStorage.setItem("isLogin", true);

      navigate("/chat");
    } catch (e) {
      toast.error("Avatar couldn't save");
      console.log(e);
    }
  };

  return (
    <div className="avatar-container">
      <h2 style={{ textAlign: "center", color: "blue", margin: "0.5rem 0" }}>
        Select Your Profile Avatar
      </h2>
      <div className="nav">
        <h4>Random Avatar Generator</h4>
      </div>
      <div className="home">
        <h4 style={{textAlign:'center'}} >Choose category of your Avatar</h4>
        <div className="btns">
          <button
            onClick={() => {
              handleSprite("avataaars");
            }}
          >
            Human
          </button>

          <button
            onClick={() => {
              handleSprite("micah");
            }}
          >
            Avatars
          </button>

          <button
            onClick={() => {
              handleSprite("gridy");
            }}
          >
            Alien
          </button>
          <button
            onClick={() => {
              handleSprite("bottts");
            }}
          >
            Bots
          </button>

          <button
            onClick={() => {
              handleSprite("human");
            }}
          >
            Pixel
          </button>

          <button
            onClick={() => {
              handleSprite("jdenticon");
            }}
          >
            Vector
          </button>
          <button
            onClick={() => {
              handleSprite("identicon");
            }}
          >
            Identi
          </button>
        </div>
        <div className="avatar">
          <img
            src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
            alt="Sprite"
          />
        </div>
        <div className="generate">
          <button
            id="gen"
            onClick={() => {
              handleGenerate();
            }}
          >
            Next
          </button>
        </div>
        <input className="save-btn-avatar"
          
          type="button"
          value="Save"
          onClick={ProfileAvatar}
        />
      </div>
    </div>
  );
};

export default SetAvatar;
