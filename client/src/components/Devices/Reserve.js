import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import "date-fns";
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
  state = {
    open: false,
    selectedDate: new Date().setDate(today.getDate() + 1),
    selectedTimeValue: 0
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTimeChange = (event, index, value) =>
    this.setState({ selectedTimeValue: value });

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    return (
      <div>
        <Button
          size="large"
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
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    className={classes.textField}
                    margin="normal"
                    value={selectedDate}
                    inputProps={{
                      step: 900 // 15 min
                    }}
                    onChange={this.handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
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

export default withStyles(styles)(Reserve);
Reserve.propTypes = {
  classes: PropTypes.object.isRequired
};
