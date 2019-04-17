import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import BookingsTable from "./BookingsTable";
import PropTypes from 'prop-types';

const date = new Date();
const time = timeArray(date);

const styles = theme => ({
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 80
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 70
  }
});

class BookDevice extends React.Component {
  state = {
    open: false,
    selectedTimeValue: 0
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTimeChange = event => {
    this.setState({ selectedTimeValue: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={this.handleClickOpen}
          style={{ height: 50 }}
        >
          Book device
        </Button>
        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Book device"}
            <DialogContent className={classes.dialog}>
              <InputLabel className={classes.input}>
                From{" "}
                {(date.getHours() < 10 ? "0" : "") +
                  date.getHours() +
                  ":" +
                  (date.getMinutes() < 10 ? "0" : "") +
                  date.getMinutes()}
              </InputLabel>
              <InputLabel className={classes.input}>To</InputLabel>
              <Select
                value={this.state.selectedTimeValue}
                onChange={this.handleTimeChange}
                className={classes.input}
                color="inherit"
              >
                {time.map((t, index) => (
                  <MenuItem key={index} selected={index === "Pyxis"} value={(t.getHours()<10?'0':'')+t.getHours()+":"+(t.getMinutes()<10?'0':'')+t.getMinutes()}>
                    {(t.getHours()<10?'0':'')+t.getHours()+":"+(t.getMinutes()<10?'0':'')+t.getMinutes()}
                  </MenuItem>
                ))}
              </Select>
              
              <BookingsTable/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="inherit">
                OK
              </Button>
              <Button onClick={this.handleClose} color="inherit" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </DialogTitle>
        </Dialog>
      </div>
    );
  }
}

function timeArray(date) {
  var h = date.getHours();
  var min = date.getMinutes();
  var time = [];

  min = (Math.ceil(min / 15) + 1) * 15;
  if (min > 60) {
    min = 15;
    h++;
  }
  if (min == 60) {
    min = 0;
    h++;
  }
  while (h < 24) {
    if (min >= 60) {
      min = 0;
      h++;
    }
    var d = new Date();
    d.setHours(h);
    d.setMinutes(min);
    time.push(d);
    min += 15;
  }
  return time;
}
BookDevice.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BookDevice);
