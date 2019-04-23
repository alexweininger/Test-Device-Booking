import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

const today = new Date();

const styles = theme => ({
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 70
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  grid: {
    width: "60%"
  }
});

class Reserve extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedDate: new Date().setDate(today.getDate() + 1),
      selectedDateTo: new Date().setDate(today.getDate() + 2),
      selectedTimeValue: 0,
      reserved: {
        startDate:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          (today.getDate() + 1) +
          " " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        finishDate:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          (today.getDate() + 2) +
          " " +
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds(),
        ID: "2",
        sNumber: this.props.sNumber
      },
      message: null
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });

    //this.state.reserved.startDate =
    //  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.state.reserved.startDate = date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
    //this.state.reserved.sNumber = sNumber;
  };
  handleDateChangeTo = date => {
    this.setState({
      selectedDateTo: date
    });

    //this.state.reserved.startDate =
    //  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.state.reserved.finishDate = date
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddNewReserved = () => {
    this.setState({ open: false });
    this.addReserved(this.state.reserved);
  };

  handleTimeChange = (event, index, value) =>
    this.setState({ selectedTimeValue: value });

  render() {
    const { classes, sNumber } = this.props;
    const { selectedDate, selectedDateTo } = this.state;
    var sNumber2 = { sNumber };
    return (
      <div>
        <Button
          size="large"
          style={{ height: 50, marginRight: 10, marginLeft: 5 }}
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          Reserve
        </Button>
        <Dialog
          className={classes.dialog}
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Reserve"}
            <DialogContent className={classes.dialog}>
              <InputLabel className={classes.input}>From</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                    className={classes.textField}
                    margin="normal"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    className={classes.textField}
                    margin="normal"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <InputLabel className={classes.input}>To</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                    className={classes.textField}
                    margin="normal"
                    value={selectedDateTo}
                    onChange={this.handleDateChangeTo}
                  />
                  <TimePicker
                    className={classes.textField}
                    margin="normal"
                    value={selectedDateTo}
                    inputProps={{
                      step: 0 // 15 min
                    }}
                    onChange={this.handleDateChangeTo}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleAddNewReserved} color="inherit">
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

  /* add the given office to the database
   */
  addReserved(reserved) {
    console.log("callded_");
    //if(!this.officeCanBeAdded(office)){
    //	return false;
    //}

    //send office to the DB
    const request = new Request("/new_reserve", {
      method: "POST",
      body: JSON.stringify(reserved),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        //if we successfully updated the DB

        if (result.success) {
          //add the office
          reserved.number = result.Number;
          this.state.reserved[result.Number] = reserved;
          /* this.updateState({
            reserved: this.state.reserved
          });*/
        }
      });

    return true;
  }
}

export default withStyles(styles)(Reserve);
Reserve.propTypes = {
  classes: PropTypes.object.isRequired
};
