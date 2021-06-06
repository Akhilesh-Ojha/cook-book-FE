import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    fetchAllRecipes(state, action) {
      state.recipes = {
        ...state,
        recipes: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    },

    fetchSearchedRecipes(state, action) {
      state.recipes = { ...state, recipes: action.payload };
    },
    // fetchRecipe(state, action) {},
    addRecipe(state, action) {
      state.recipes.recipes.push(action.payload);
    },

    updateRecipe(state, action) {
      state.recipes.recipes = state.recipes.recipes.map((recipe) =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
    },

    deleteRecipe(state, action) {
      const removedProduct = action.payload;
      state.recipes.recipes = state.recipes.recipes.filter(
        (item) => item._id !== removedProduct
      );
    },

    likedRecipe(state, action) {
      const foundRecipe = state.recipes.recipes.find(
        (recipe) => recipe._id === action.payload._id
      );
      foundRecipe.likes = action.payload.likes;
    },
  },
});

export const recipesAction = recipesSlice.actions;
export default recipesSlice.reducer;
