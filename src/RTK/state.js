

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 loginStatus:false,
};

const filterSlice = createSlice({
  name:"chat",
  initialState,
  reducers: {

    SET_LOGIN(state){
        state.loginStatus=true
      localStorage.setItem("chatLogin", true);

    },

    SET_LOGOUT(state){
      state.loginStatus=false 
      localStorage.removeItem  ("chatLogin");
      localStorage.removeItem("chatLoginUserId");
      localStorage.removeItem("chatLoginUserName");

  }

  }
});

export const {SET_LOGIN, SET_LOGOUT} = filterSlice.actions;

export default filterSlice.reducer;