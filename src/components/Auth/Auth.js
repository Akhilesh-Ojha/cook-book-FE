import React, { useState } from "react";
import {
  Typography,
  TextField,
  Avatar,
  Link,
  Grid,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useInput from "../../hooks/use-input";
import Modal from "../UI/Modal";
import { signUpUser, signInUser, signupGoogle } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Icon from "./icon";
// import { authAction } from "../../store/auth-slice";

const useStyles = makeStyles((theme) => ({
  auth: {
    maxWidth: "60rem",
    width: "90%",
    margin: "2rem auto",
    animation: "meals-appear 1s ease-out forwards",
  },

  avatar: {
    margin: "10px auto",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth = ({ onCloseLoginModal }) => {
  const classes = useStyles();
  const [loginForm, showLoginForm] = useState(true);
  const dispatch = useDispatch();
  const [hasErrorSignIn, setErrorSignIn] = useState("");
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    value: enteredEmail,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput((value) => re.test(value));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    valueBlurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    valueBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
  } = useInput((value) => value.trim() !== "" && value === enteredPassword);

  const hasErrorInSignIn = (message) => {
    if (message === "closeModal") {
      onCloseLoginModal();
    } else {
      setErrorSignIn(message);
    }
  };

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    if (event.target.name === "signupform") {
      const signUpFormData = {
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
        firstName: enteredFirstName,
        lastName: enteredLastName,
      };

      dispatch(signUpUser(signUpFormData, hasErrorInSignIn));
    } else {
      const signInFormData = {
        email: enteredEmail,
        password: enteredPassword,
      };
      dispatch(signInUser(signInFormData, hasErrorInSignIn));
    }

    emailReset();
    passwordReset();
    firstNameReset();
    lastNameReset();
    confirmPasswordReset();
  };

  const toggleSingInForm = () => {
    showLoginForm((prevState) => {
      showLoginForm(!prevState);
      emailReset();
      passwordReset();
    });
  };

  const googleLoginSuccess = async (res) => {
    console.log("Response", res);

    const googleObj = {
      firstName: res?.profileObj.givenName,
      lastName: res?.profileObj.familyName,
      googleId: res?.profileObj.googleId,
      email: res?.profileObj.email,
    };
    dispatch(signupGoogle(googleObj, hasErrorInSignIn));
  };

  const googleFailure = (err) => {
    console.log("Google sign In failed", err);
  };

  return (
    <>
      {loginForm && (
        <Modal onCloseModal={onCloseLoginModal}>
          <div className={classes.auth}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              name="signinform"
              id="signinform"
              onSubmit={onFormSubmitHandler}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                error={emailHasError ? true : false}
                helperText={emailHasError ? "Please enter a valid email" : ""}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                error={passwordHasError ? true : false}
                helperText={
                  passwordHasError ? "Please enter a valid password" : ""
                }
              />
              {hasErrorSignIn && (
                <p style={{ color: "#F97368" }}>{hasErrorSignIn}</p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>

              <GoogleLogin
                clientId="837977748159-fs2g099066f9pv42nooo3rrlnuds478b.apps.googleusercontent.com"
                // secret="mRjFzslKi9AgeuC1FdoUJXD6"
                render={(renderProps) => (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    // color="red"
                    // style={{ backgroundColor: "red" }}
                    className={classes.submit}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                  >
                    Sign In with Google
                  </Button>
                )}
                onSuccess={googleLoginSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={toggleSingInForm}
                    style={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      )}
      {!loginForm && (
        // <Container component="main">
        <Modal onCloseModal={onCloseLoginModal}>
          <div className={classes.auth}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              className={classes.form}
              name="signupform"
              id="signupform"
              onSubmit={onFormSubmitHandler}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler}
                    value={enteredFirstName}
                    error={firstNameHasError ? true : false}
                    helperText={
                      firstNameHasError ? "Please enter a valid first name" : ""
                    }
                    // autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler}
                    value={enteredLastName}
                    error={lastNameHasError ? true : false}
                    helperText={
                      lastNameHasError ? "Please enter a valid last name" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                    error={emailHasError ? true : false}
                    helperText={
                      emailHasError ? "Please enter a valid email" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPassword}
                    error={passwordHasError ? true : false}
                    helperText={
                      passwordHasError ? "Please enter a valid password" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler}
                    value={enteredConfirmPassword}
                    error={confirmPasswordHasError ? true : false}
                    helperText={
                      confirmPasswordHasError ? "Password does not match" : ""
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={toggleSingInForm}
                    style={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Auth;
