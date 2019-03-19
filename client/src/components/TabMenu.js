import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reports from './Reports';
import NewDevice from "./NewDevice";
import Grid from "./Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import ReactDOM from 'react-dom';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1500
  }
});

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}


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

    NewDevice() {
      ReactDOM.unmountComponentAtNode(document.getElementById("root"));
      ReactDOM.render(<NewDevice />, document.getElementById("root"));
    }

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs 
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            variant="fullWidth"
          >
            <LinkTab label="DEVICE BOOKING" >
            </LinkTab>
            <LinkTab label="OFFICES"></LinkTab>
            <LinkTab label="REPORTS" >
              <Reports/>
            </LinkTab>
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >        
        {this.state.value === 0 &&           
        <div><Fab className={classes.fab} color="primary" aria-label="Add" onClick={this.NewDevice}>
            <AddIcon />
          </Fab>
          <Grid /> 
          </div>}
          {this.state.value === 1}
        {this.state.value === 2 && <Reports/>}
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
