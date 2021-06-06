import * as api from "../api/index";
import { recipesAction } from "../store/recipes-slice";

//Action Creators: function that return an action

export const getRecipes = (page, stopLoading) => async (dispatch) => {
  try {
    const { data } = await api.fetchRecipes(page);
    dispatch(recipesAction.fetchAllRecipes(data));
    stopLoading();
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesBySearch = (searchQuery, stopLoading) => async (
  dispatch
) => {
  try {
    const { data } = await api.fetchRecipesBySearch(searchQuery);
    dispatch(recipesAction.fetchSearchedRecipes(data));
    stopLoading();
  } catch (error) {
    console.log(error);
    stopLoading();
  }
};

export const addRecipe = (newRecipe, history) => async (dispatch) => {
  try {
    const { data } = await api.addRecipe(newRecipe);
    dispatch(recipesAction.addRecipe(data));
    history.push("/recipes");
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, updateRecipeBody, history) => async (
  dispatch
) => {
  try {
    const { data } = await api.updateRecipe(id, updateRecipeBody);
    dispatch(recipesAction.updateRecipe(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);
    dispatch(recipesAction.deleteRecipe(id));
  } catch (error) {
    console.log(error);
  }
};

export const likeRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeRecipe(id);
    dispatch(recipesAction.likedRecipe(data));
  } catch (error) {
    console.log(error);
  }
};
