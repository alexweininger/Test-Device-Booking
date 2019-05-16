import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Users/Pages/Login";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2E8B57",
      dark: "#F6F6F6"
    },
    secondary: {
      main: "#CE2B27"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
