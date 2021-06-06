import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchRecipes = (page) => API.get(`/recipes?page=${page}`);

export const fetchRecipesBySearch = (searchQuery) =>
  API.get(
    `/recipes/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );

export const fetchRecipe = (id) => API.get(`/recipes/${id}`);

export const addRecipe = (newRecipe) => API.post("/recipes", newRecipe);

export const updateRecipe = (id, updatedRecipe) =>
  API.patch(`recipes/${id}`, updatedRecipe);

export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);

export const likeRecipe = (id) => API.patch(`/recipes/${id}/like`);

export const signIn = (loginDetails) => API.post(`/users/signin`, loginDetails);

export const signUp = (signUpDetails) =>
  API.post(`/users/signup`, signUpDetails);

export const signUpGoogle = (signUpDetails) =>
  API.post(`/users/signup-google`, signUpDetails);

export const bookMarkRecipe = (recipeId) =>
  API.patch(`/recipes/${recipeId}/bookMark`);

export const getUser = () => API.get("/users/userDetails");

export const getBookMarkedRecipesOfUser = () =>
  API.get("/users/bookMarkedRecipes");
