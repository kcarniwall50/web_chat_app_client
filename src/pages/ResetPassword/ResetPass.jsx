import axios from "axios";
import React, { useState } from "react";
import { MdLockReset } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./resetPass.css";
const backend_url = process.env.REACT_APP_BACKEND_URL;

const ResetPass = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("Please give password");
    }

    if (password !== password2) {
      return toast.error("confirem password did not match");
    }

    if (password.length < 6) {
      return toast.error("Password length can not be less than 6");
    }

    const userData = {
      password,
    };
    try {
      const response = await axios.put(
        `${backend_url}/api/user/resetPassword/${resetToken}`,
        userData,
        { withCredentials: true }
      ); // why not email (formData)
      console.log("res", response);
      toast.success(response.data);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className="reset-container">
      <MdLockReset size="30" color="blue" style={{ marginTop: "1rem" }} />
      <h3  style={{margin:'0.5rem 0'}} > Reset  Password</h3>
      <form onSubmit={resetPassword}>
        <div>
          <input
            className="reset-input"
            type="password"
            placeholder="new password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
        </div>

        <div>
          <input
            className="reset-input"
            type="password"
            placeholder="confirem password"
            name="password2"
            value={password2}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <input
            className=" reset-btn  reset-input"
            type="submit"
            value="reset password"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
