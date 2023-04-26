import React, { useEffect, useState } from "react";
import "./setAvatar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const backend_url = process.env.Backend_URL;

const SetAvatar = ({ socket }) => {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  useEffect(() => {
    if (isLogin) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  });

  // Setting up the initial states using react hook 'useState'
  const [sprite, setSprite] = useState("bottts");
  const [seed, setSeed] = useState(1000);

  // Function to set the current sprite type
  function handleSprite(spritetype) {
    setSprite(spritetype);
  }

  // Function to generate random seeds for the API
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
      console.log("kp", res.data, "pp");
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
    <div className="container">
      <h2 style={{ textAlign: "center", color: "blue", margin: "0.5rem 0" }}>
        Select Your Profile Avatar
      </h2>
      <div className="nav">
        <h4>Random Avatar Generator</h4>
      </div>
      <div className="home">
        <bold style={{ fontSize: "18px" }}>Choose category of your Avatar</bold>
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
        <input
          style={{
            padding: "0.2rem",
            margin: "0.5rem 0",
            width: "20%",
            color: "",
            fontSize: "20px",
          }}
          type="button"
          value="Save"
          onClick={ProfileAvatar}
        />
      </div>
    </div>
  );
};

export default SetAvatar;
