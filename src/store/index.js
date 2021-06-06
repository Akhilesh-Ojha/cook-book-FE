import { configureStore } from "@reduxjs/toolkit";
import recipesSlice from "./recipes-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { recipes: recipesSlice, auth: authSlice },
});

export default store;
