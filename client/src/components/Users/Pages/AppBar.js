import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
          <AppBar position="static" color="default">
            <div>
              <nav>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="none"
                  variant="fullWidth"
                >
                  <NavLink
                    style={{
                      color: "black",
                      padding: 8 * 3,
                      textDecoration: "none"
                    }}
                    to="/Login"
                  >
                    {" "}
                    LOG IN
                  </NavLink>
                  <NavLink
                    style={{
                      color: "black",
                      padding: 8 * 3,
                      textDecoration: "none"
                    }}
                    to="/SignUp/"
                  >
                    SIGN UP
                  </NavLink> 
                </Tabs>
              </nav>
            </div>
          </AppBar>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
