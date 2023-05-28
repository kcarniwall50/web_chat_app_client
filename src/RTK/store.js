import { configureStore } from "@reduxjs/toolkit";
import state from './state'

export const store= configureStore({
  reducer:{
         chat:state
  }
})