import axios from "axios";
import React, { useState } from "react";
import { Si1Password } from "react-icons/si";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./forgotPass.css";
const backend_url = process.env.REACT_APP_BACKEND_URL;

const ForgotPass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  
  });
  const { email} = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter email");
    }

    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    try {
      const response = await axios.post(
        `${backend_url}/api/user/forgotPass`,
        formData
      );

      toast.success(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="forgot-container">
      <Si1Password size="30" color="blue" style={{ marginTop: "1rem" }} />
      <h3 style={{margin:'0.5rem 0 1rem 0'}} >Forgot Password</h3>
      <form onSubmit={forgotPassword}>
        <div style={{ margin: "0.5rem 0" }}>

          <input   className="forgot-input"

            type="email"
            placeholder="enter email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
        </div>
        <div style={{ display: "block", width: "100%" }}>
          <input  className=" forgot-btn  forgot-input"
            
            type="submit"
            value="forgot password"
          />
        </div>
      </form>

    </div>
  );
};

export default ForgotPass;
