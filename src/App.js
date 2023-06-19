import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.js/Home";
import Login from "./pages/Login/Login";
import SetAvatar from "./pages/Set Avatar/SetAvatar";
import SignUp from "./pages/SignUp/SignUp";
import Chat from "./pages/Chat/Chat";
import socketClient from "socket.io-client";
import ForgotPass from "./pages/ForgotPassword/ForgotPass";
import ResetPass from "./pages/ResetPassword/ResetPass";
import { useSelector } from "react-redux";

function App() {
  if (process.env.REACT_APP_NODE_ENV !== "development") {
    console.log = function () {};
  }

  const SERVER = process.env.REACT_APP_BACKEND_URL;
  var socket = socketClient(SERVER);

  const loginStatus = useSelector((state) => state.chat.loginStatus);
  const isLogin = localStorage.getItem("chatLogin");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/resetPass/:resetToken" element={<ResetPass />} />

        <Route
          path="/setAvatar"
          element={
            loginStatus || isLogin ? (
              <SetAvatar socket={socket} />
            ) : (
              <Navigate to="/login"/>
            )
          }
        />

        <Route
          path="/chat"
          element={
            loginStatus || isLogin ? (
              <Chat socket={socket} />
            ) : (
              <Navigate to= "/login"/>
            )
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
