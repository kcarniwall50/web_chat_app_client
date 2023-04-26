import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.css";
const backend_url = process.env.Backend_URL;

const Login = ({ socket }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData)
  };

  // const isLogin = localStorage.getItem("isLogin")
  //   ? JSON.parse(localStorage.getItem("isLogin"))
  //   : false;

  // const nameStatus = localStorage.getItem("userName")
  //   ? JSON.parse(localStorage.getItem("userName"))
  //   : "";

  const FormSubmit = async (e) => {
    e.preventDefault();

    // validating incoming inputs fields
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
      // console.log("res", response, "..");

      if (response.status === 200) {
        toast.success("Login Successfully");
      }

      // localStorage.getItem("isLogin", JSON.stringify(true));
      // localStorage.setItem("userName", JSON.stringify(response.data.name));

      if (response.data.isAvatarSet) {
        localStorage.setItem("loginUserId", JSON.stringify(response.data._id));
        localStorage.setItem(
          "loginUserName",
          JSON.stringify(response.data.name)
        );

        localStorage.setItem("isLogin", true);

        socket.emit("new-user", {
          userName: response.data.name,
          userId: response.data._id,
          socketID: socket.id,
        });

        return navigate("/chat");
      } else {
        return navigate("/setAvatar");
      }
    } catch (e) {
      if (e.response.status === 404) {
        toast.error(e.response.data);
      }

      if (e.response.status === 401) {
        toast.error(e.response.data);
      }

      console.log("errrr", e, "...");
    }
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     navigate("/");
  //   }
  // }, [isLogin]);

  return (
    <div className="login-container">
      <BiLogIn size="30" color="blue" style={{ marginTop: "1rem" }} />
      <h2>Login</h2>
      <form onSubmit={FormSubmit}>
        <div style={{ margin: "0.5rem 0" }}>
          {/* <HiOutlineMail size="25"style={{ color:"blue", position:"relative", left:"1.6rem", top:"0.3rem",}} />  */}
          {/* <FontAwesomeIcon icon="fa-solid fa-envelope" /> */}
          <input
            style={{
              padding: "0.3rem",
              fontFamily: "Arial, FontAwesome",
              width: "40%",
              marginInline: "auto",
            }}
            type="email"
            placeholder="enter email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
          {/* placeholder=" &#xf2b9; f007; &#xf16a; fa-youtube-play  enter email" */}
        </div>
        <div style={{}}>
          <input
            style={{
              padding: "0.3rem",
              marginBottom: "1.5rem",
              width: "40%",
              marginInline: "auto",
            }}
            type="password"
            placeholder="enter password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
        </div>
        <div style={{ display: "block", width: "100%" }}>
          <input
            style={{
              padding: "0.2rem",
              marginBottom: "1.5rem",
              width: "40%",
              marginInline: "auto",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
            type="submit"
            value="Login"
          />
        </div>
        {/* Login </input>  */}
      </form>
      <div style={{ display: "block", marginBottom: "1.5rem" }}>
        {/* not working styling why ???  */}
        <Link style={{ textDecoration: "none" }} to="/forgotPass">
          {" "}
          &nbsp;{" "}
          <code>
            <small>Forgot Password</small>{" "}
          </code>
        </Link>
        <code>
          <small>Don't have account?</small>
        </code>
        <Link style={{ textDecoration: "none" }} to="/signUp">
          {" "}
          &nbsp;{" "}
          <code>
            <small>SignUp</small>
          </code>
        </Link>
        &nbsp;
      </div>
    </div>
  );
};

export default Login;
