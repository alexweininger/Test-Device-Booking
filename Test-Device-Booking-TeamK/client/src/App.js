import React, { Component } from "react";
import ReactDOM from "react-dom";
import NewDevice from "./components/NewDevice";
import Header from "./components/Header";
import TabMenu from "./components/TabMenu";
import Grid from "./components/Grid";
import Fab from "@material-ui/core/Fab";
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 20,
    right: theme.spacing.unit * 10,
  },
});
class App extends Component {
  NewDevice() {
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    ReactDOM.render(<NewDevice />, document.getElementById("root"));
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <Header />
        <TabMenu />
        <Fab className={classes.fab} color="primary" aria-label="Add" onClick={this.NewDevice}>
          <AddIcon />
        </Fab>
        <Grid />
      </div>
    );
  }
}
export default withStyles(styles)(App);
