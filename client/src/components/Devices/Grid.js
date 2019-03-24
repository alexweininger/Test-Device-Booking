import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Media from "./Media";

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
  }
});

function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
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
