import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Media from "./Media";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import ReactDOM from "react-dom";
import NewDevice from "./NewDevice.js";
import Grid from "@material-ui/core/Grid";
import Selection from "./Selection";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  fab: {
    position: "absolute",
    top: theme.spacing.unit * 20,
    right: theme.spacing.unit * 10
  }
});

/*function TitlebarGridList(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="Add"
        onClick={() =>
          ReactDOM.render(<NewDevice />, document.getElementById("root"))
        }
        style={{ zIndex: 1 }}
      >
        <AddIcon />
      </Fab>
      <Grid container spacing={20}>
        <Grid item xs={3}>
          <Selection />
        </Grid>

        <Grid item xs={8}>
          <Grid item xs={2.5} container spacing={0}>
            <Media text={"kazkas"} kakalis={"kazkas"} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitlebarGridList);*/

class TitlebarGridList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: []
    };

    this.getDevicesFromServer();
  }

  render() {
    const { classes } = this.props;
    const devices = this.state.devices || [];
    return (
      <div className={classes.root}>
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="Add"
          onClick={() =>
            ReactDOM.render(<NewDevice />, document.getElementById("root"))
          }
          style={{ zIndex: 1 }}
        >
          <AddIcon />
        </Fab>
        <Grid container spacing={20}>
          <Grid item xs={3}>
            <Selection />
          </Grid>

          <Grid item xs={8}>
            <Grid item xs={2.5} container spacing={0}>
              {devices.map(device => (
                <Media
                  text={device.Brand + " " + device.Model}
                  text2={
                    "OS: " +
                    device.OS +
                    "\n Identification number:" +
                    device.Serial_Number
                  }
                  bookText={device.Serial_Number+""}
                  //Serial_Number={device.Serial_Number}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  getDevicesFromServer() {
    const request = new Request("/get_device", {
      method: "GET"
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        console.log("result ", result);
        if (result.success) {
          this.setState({
            devices: result.devices
          });
        }
      });
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TitlebarGridList);
