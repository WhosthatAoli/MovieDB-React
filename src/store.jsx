import { configureStore } from "@reduxjs/toolkit";
import movieDBReducer from "./Reducers/movieDBSlice";

export const store = configureStore({
  reducer: {
    DBReducer: movieDBReducer
  }
});
