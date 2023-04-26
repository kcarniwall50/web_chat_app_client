import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./signUp.css";

const backend_url = process.env.Backend_URL;

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confiremPassword: "",
  });
  const { name, email, password, confiremPassword } = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData)
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    // validating incoming inputs fields
    if (!name || !email || !password || !confiremPassword) {
      return toast.error("Fields cant be empty");
    }

    if (password.length < 6) {
      return toast.error("Password size cant be less than 6");
    }

    if (password !== confiremPassword) {
      return toast.error("Passwords didn't match");
    }

    //  calling api
    // console.log("form", formData, "kk")

    try {
      const response = await axios.post(
        `${backend_url}/api/user/register`,
        formData
      );
      console.log("res", response, "..");
      console.log("res", response.cookie, "..");
      if (response.status === 201) {
        toast.success("Registered Successfully");
      }
      // console.log("kk", action, "..")
      if (response.status === 200) {
        toast.error("User already registered");
      }
    } catch (error) {
      console.log("errrr", error, "...");
    }
  };

  return (
    <div className="signUp-container">
      <FaUserPlus size="30" color="blue" className="signUp-user-icon" />
      <h2>Register</h2>
      <form onSubmit={formSubmit} className="signUp-form-container">
        <div className="signUp-inputs-container">
          <input
            className="signup-inputs"
            type="text"
            placeholder="enter name"
            name="name"
            value={name}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="signUp-inputs-container">
          <input
            className="signup-inputs"
            type="email"
            placeholder="enter email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
          {/* placeholder=" &#xf2b9; f007; &#xf16a; fa-youtube-play  enter email" */}
        </div>
        <div className="signUp-inputs-container">
          <input
            className="signup-inputs"
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="signUp-inputs-container">
          <input
            className="signup-inputs"
            type="password"
            placeholder="confirm password"
            name="confiremPassword"
            value={confiremPassword}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="signUp-inputs-container">
          <input className="signup-inputs" type="submit" value="SignUp" />
        </div>
        {/* Login </input>  */}
      </form>
      <div style={{ display: "block", marginBottom: "1.5rem" }}>
        {/* not working styling why ???  */}
        <div>
          <code>
            <small>Already have account?</small>
          </code>
          <Link style={{ textDecoration: "none" }} to="/login">
            {" "}
            &nbsp;{" "}
            <code>
              <small>Login</small>
            </code>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
