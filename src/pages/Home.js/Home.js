import React from "react";
import "./home.css";
import homeImg from "../../assets/home.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-img" >
        <img src={homeImg}  alt="img" />
      </div>
      <div style={{ width: "60%", margin:'1rem auto' }}>
  
        <div style={{ textAlign: "center", padding:'1rem' }}>
          <h4>Welcome🤗 to CHATME web app</h4>
          <br />
          <p  style={{textAlign:'start'}} >
            Free messages to all friends and make messaging fun with trending
            emoji😊
          </p>
        </div>
      </div>
      <div className="links">
        <Link className="home-signup" to="/signUp">
          SignUp
        </Link>
        <Link className="home-login" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
