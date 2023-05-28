import axios from "axios";
import React, { useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../../RTK/state";
const backend_url = process.env.REACT_APP_BACKEND_URL;

const Login = ({ socket }) => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const FormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Fields cant be empty");
    }

    //  calling api

    try {
      const response = await axios.post(
        `${backend_url}/api/user/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Login Successfully");
      }

 dispatch(SET_LOGIN())

      if (response.data.isAvatarSet) {
        localStorage.setItem("chatLoginUserId", JSON.stringify(response.data._id));

        localStorage.setItem(
          "chatLoginUserName",
          JSON.stringify(response.data.name)
        );

        socket.emit("new-user", {
          userName: response.data.name,
          userId: response.data._id,
          socketID: socket.id,
        });

        return navigate("/chat");
      } 
      else {
        return navigate("/setAvatar");
      }
    } catch (e) {
      if (e.response.status === 404) {
        toast.error(e.response.data);
      }

      if (e.response.status === 401) {
        toast.error(e.response.data);
      }

      console.log("errrr", e);
    }
  };

  return (
    <div className="login-container">
      <BiLogIn size="30" color="blue" style={{ marginTop: "1rem" }} />
      <h2>Login</h2>
      <form onSubmit={FormSubmit}>
        <div style={{ margin: "0.5rem 0" }}>
          <input  className="login-input"
            type="email"
            placeholder="enter email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
        </div>
        <div >
          <input  className="login-input"
         
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
        </div>
        <div style={{ display: "block", width: "100%" }}>
          <input className=" login-btn  login-input"
            type="submit"
            value="Login"
          />
        </div>
      </form>


      <div style={{ display: "block", marginBottom: ".2rem" }}>
        <Link style={{ textDecoration: "none" }} to="/forgotPass">
          {" "}
          &nbsp;{" "}
          <code>
            <small>forgot password?</small>
          </code>
        </Link>
        &nbsp;
      </div>

      <div style={{ display: "block", marginBottom: "1.5rem" }}>
        <code>
          <small>Don't have account?</small>
        </code>
        <Link style={{ textDecoration: "none" }} to="/signUp">
          {" "}
          &nbsp;{" "}
          <code>
            <small>signUp</small>
          </code>
        </Link>
        &nbsp;
      </div>
    </div>
  );
};

export default Login;
