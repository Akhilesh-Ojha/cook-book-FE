import * as api from "../api/index";
import { authAction } from "../store/auth-slice";

export const signUpUser = (signUpDetails, hasErrorInSignIn) => async (
  dispatch
) => {
  try {
    const { data } = await api.signUp(signUpDetails);
    hasErrorInSignIn("closeModal");
    dispatch(authAction.auth(data));
  } catch (error) {
    hasErrorInSignIn(error?.response?.data?.message);
  }
};

export const signInUser = (signInDetails, hasErrorInSignIn) => async (
  dispatch
) => {
  try {
    const { data } = await api.signIn(signInDetails);
    hasErrorInSignIn("closeModal");
    dispatch(authAction.auth(data));
  } catch (error) {
    hasErrorInSignIn(error?.response?.data?.message);
  }
};

export const signupGoogle = (signInDetails, hasErrorInSignIn) => async (
  dispatch
) => {
  try {
    const { data } = await api.signUpGoogle(signInDetails);
    hasErrorInSignIn("closeModal");
    dispatch(authAction.auth(data));
  } catch (error) {
    hasErrorInSignIn(error?.response?.data?.message);
  }
};

export const bookMarkRecipe = (id) => async (dispatch) => {
  try {
    const { data } = await api.bookMarkRecipe(id);
    dispatch(authAction.bookMarKRecipe(data));
  } catch (error) {
    console.log(error);
  }
};
