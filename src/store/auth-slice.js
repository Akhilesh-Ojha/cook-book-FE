import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  userName: "",
  id: "",
  bookMarkedRecipes: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    auth(state, action) {
      state.isLoggedIn = true;
      state.userToken = action.payload.token;
      state.userName = action.payload.result.name;
      state.id = action.payload.result.id;
      if (!localStorage.getItem("profile")) {
        state.id = action.payload.result._id;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      }
    },
    logout(state, action) {
      localStorage.removeItem("profile", JSON.stringify({ ...action.payload }));
      state.isLoggedIn = false;
      state.userToken = null;
      state.userName = "";
      state.id = "";
    },
    bookMarKRecipe(state, action) {
      state.bookMarkedRecipes = action.payload.data.bookMarkedRecipes;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
