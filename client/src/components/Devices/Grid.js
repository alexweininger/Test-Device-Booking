import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Media from "./Media";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import ReactDOM from "react-dom";
import NewDevice from "./NewDevice.js";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    paddingLeft: 500,
  },
  gridList: {
    width: '100%',
    height: '100%'
  },

  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  fab: {
    position: 'absolute',
    top: theme.spacing.unit * 20,
    right: theme.spacing.unit * 10,
  }
});

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Fab className={classes.fab} color="primary" aria-label="Add" onClick={() => (ReactDOM.render(<NewDevice />, document.getElementById("root")))}>
        <AddIcon />
      </Fab>
      <GridList className={classes.gridList} cols={3} cellHeight={100}>
        <GridListTile key="Subheader" cols={3} style={{ height: 20 }} />
        <Media />
        <Media />
        <Media />
        <Media />
        <Media />
        <Media />
        <Media />
        <Media />
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitlebarGridList);
