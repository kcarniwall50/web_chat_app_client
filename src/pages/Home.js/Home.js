import React from "react";
import "./home.css";
import homeImg from "../../assets/home.png";
// import Navbar from '../../components/Navbar/Navbar'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* <Navbar/> */}

      <div style={{}}>
        <img src={homeImg} className="home-img" alt="image" />
      </div>
      <div style={{ width: "60%", marginInline: "auto" }}>
        <p>
          the route or course by which a person or thing passes or travels. a
          hall or corridor; passageway. an opening or entrance into, through, or
          out of something: the nasal passages. a voyage by water from one point
          to another: a rough passage across the English Channel.
        </p>

        <p>
          the route or course by which a person or thing passes or travels. a
          hall or corridor; passageway. an opening or entrance into, through, or
          out of something: the nasal passages. a voyage by water from one point
          to another: a rough passage across the English Channel.
        </p>

        <p>
          the route or course by which a person or thing passes or travels. a
          hall or corridor; passageway. an opening or entrance into, through, or
          out of something: the nasal passages. a voyage by water from one point
          to another: a rough passage across the English Channel.
        </p>
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
