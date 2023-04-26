import React from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home.js/Home';
import Login from './pages/Login/Login';
import SetAvatar from './pages/Set Avatar/SetAvatar';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat'

// import socketClient  from "socket.io-client";
// const SERVER = "http://127.0.0.1:3000";

import socketIO from 'socket.io-client';




function App() {

//   var socket = socketClient (SERVER);
//   socket.on('connection', () => {
//     console.log(`I'm connected with the back-end`);
// });

const socket = socketIO.connect('http://localhost:5000');

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/login' element={<Login socket={socket} />}/>
      <Route path='/setAvatar' element={<SetAvatar  socket={socket} />}/>
      <Route path='/chat' element={<Chat socket={socket} />}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
