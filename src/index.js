import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
// import blueGrey from "@material-ui/core/colors/blueGrey";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: blueGrey[900],
      main: "rgba(0,0,0,0.9)",
    },
    secondary: {
      main: grey[500],
    },
  },
  typography: {
    fontFamily: "BT Futura W01",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
