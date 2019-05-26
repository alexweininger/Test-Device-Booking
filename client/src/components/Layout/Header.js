import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import logo from "../Data/devbridge_full.png";
import SearchIcon from "@material-ui/icons/Search";
import Login from "../Users/Pages/Login";
import { NavLink } from "react-router-dom";

import { inputText } from "../Devices/Grid";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary,
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    },
    marginLeft: 0,
    width: "100%",
    height: "70%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      height: "100%",
      "&:focus": {
        width: 275,
        height: "100%"
      }
    }
  }
});

function assignValue(newValue) {
  return Object.assign(inputText, { value: newValue });
}
function ifLogOut() {
  localStorage.setItem("userId", "null");
  localStorage.setItem('userBookings', "null");
  //window.location = "http://localhost:3000/Login";
}

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <a href="/">
              <img alt="DevBridge Logo" src={logo} style={{ height: 75 }} />
            </a>
          </Typography>
          <div
            className={classes.search}
            style={{ backgroundColor: "#F6F6F6" }}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for device"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              onInput={event => {
                assignValue(event.target.value);
              }}
            />
          </div>
          <div />
          <button
            style={{
              borderRadius: 18,
              marginLeft: 16,
              marginRight: 8,
              backgroundColor: "#F6F6F6",
              border: "none",
              fontSize: 16,
              padding: 9,
              cursor: "pointer"
            }}
            onClick={ifLogOut}
          >
            <NavLink
              to="/Login"
              style={{ color: "black", textDecoration: "none" }}
            >
              Log Out
            </NavLink>
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
