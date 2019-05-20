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
import BookingsTable from "./BookingsTable";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NewDevice from "../../App";
import DateFnsUtils from "@date-io/date-fns";
import ReactDOM from 'react-dom';
import { DateRangePicker } from 'material-ui-datetime-range-picker';
//import ReservationsTable from "./ReservationsTable";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

var today = new Date();
var time = [];
var ID = "0";
var bkngs = [];
var closestBooking;

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

class ReserveDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      time: [],
      open: false,
      selectedDateFrom: new Date(),
      selectedDateTo: new Date(),
      selectedTimeValue: 0,
      reserved: {
        startDate: "",
        finishDate: "",
        userID: "2",
        sNumber: this.props.sNumber
      },
    };
  }

  handleDateChangeFrom = date => {
    console.log("dateChanging");
    this.setState({selectedDateTo: date});
    this.setState({selectedDateFrom: date});
    console.log("dateChanged");
    console.log("Accept");
    this.setState({ bookings: this.getTodaysBookings(timeArrayFrom)});
    this.render();
    console.log(this.state.selectedDateFrom);
    
    console.log("Accepted");
};
handleDateChangeTo = date => {
  console.log(this.state.selectedDateFrom);
    this.setState({selectedDateTo: date});
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
    
  disableRandomDates() {
    console.log(Math.random() > 0.7);
    return Math.random() > 0.7;
  }
  disableWeekends(date) {
      return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    const { classes, sNumber } = this.props;
    return (
      <div>
        <Button
          size="large"
          style={{ height: 60, marginRight: 10, marginLeft: 5 }}
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
                    value={this.state.selectedDateFrom}
                    selected={this.state.selectedDateFrom}
                    selectsEnd
                    startDate={this.state.selectedDateFrom}
                    endDate={this.state.selectedDateTo}
                    onChange={this.handleDateChangeFrom}
                  //  onAccept={this.HandleAccept}
                    disablePast="true"
                    shouldDisableDate={this.disableWeekends}
                />  
                <Select
                value={this.state.selectedTime}
                onChange={this.handleTimeChange}
                className={classes.input}
                color="inherit"
              >
                {time.map((t, index) => (
                  <MenuItem
                    key={index}
                    value={t}
                    selected={index === "Pyxis"}
                    InputLabel={
                      (t.getHours() < 10 ? "0" : "") +
                      t.getHours() +
                      ":" +
                      (t.getMinutes() < 10 ? "0" : "") +
                      t.getMinutes()
                    }
                  >
                    {(t.getHours() < 10 ? "0" : "") +
                      t.getHours() +
                      ":" +
                      (t.getMinutes() < 10 ? "0" : "") +
                      t.getMinutes()}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              
           </MuiPickersUtilsProvider>
                  
              <InputLabel className={classes.input}>To</InputLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                <DatePicker
                    value={this.state.selectedDateTo}
                    selected={this.state.selectedDateTo}
                    selectsEnd
                    startDate={this.state.selectedDateFrom}
                    endDate={this.state.selectedDateTo}
                    onChange={this.handleDateChangeTo}
                    disablePast="true"
                    shouldDisableDate={this.disableWeekends}
                />  
                <Select
                value={this.state.selectedTime}
                onChange={this.handleTimeChange}
                className={classes.input}
                color="inherit"
              >
                {this.state.time.map((t, index) => (
                  <MenuItem
                    key={index}
                    value={t}
                    selected={index === "Pyxis"}
                    InputLabel={
                      (t.getHours() < 10 ? "0" : "") +
                      t.getHours() +
                      ":" +
                      (t.getMinutes() < 10 ? "0" : "") +
                      t.getMinutes()
                    }
                  >
                    {(t.getHours() < 10 ? "0" : "") +
                      t.getHours() +
                      ":" +
                      (t.getMinutes() < 10 ? "0" : "") +
                      t.getMinutes()}
                  </MenuItem>
                ))}
              </Select>

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
  getTodaysBookings(callback) {
    const request = new Request(
      `/get_dayBookings/${this.state.reserved.sNumber}`,
      {
        method: "GET"
      }
    );
  
    fetch(request)
      .then(res => {
        if (res.ok) {
          res.json().then(obj => {
            console.log(obj);
  
            this.setState({ bookings: obj });
            console.log("loaded all bookings ReserveDevice");
            callback(this.state.selectedDateFrom, this.state.bookings)
            ;
            return obj;
          });
        }
      })
      .catch(err => {
        console.log("Error in getTodaysBookings", err);
        console.log("get failed");
      });
  }
  getClosestBooking() {
    const request = new Request(
      `/get_closestBooking/${this.state.reserved.sNumber}`,
      {
        method: "GET"
      }
    );
  
    fetch(request)
      .then(res => {
        if (res.ok) {
          res.json().then(obj => {
            console.log(obj);
  
            this.setState({ bookings: obj });
            console.log("loaded all bookings ReserveDevice");
            return obj;
          });
        }
      })
      .catch(err => {
        console.log("Error in getTodaysBookings", err);
        console.log("get failed");
      });
  }
}

function timeArrayFrom(d, bookings) {

  var currentDate = new Date();
  var bookingUntilDate = new Date();
  bookingUntilDate.setDate(d.getDate() + 1);
  bookingUntilDate.setHours(0);
  bookingUntilDate.setMinutes(0);

  if(d.getDate() === currentDate.getDate() && currentDate.getFullYear() === d.getFullYear() && currentDate.getMonth() === d.getMonth())
  {
    var min = currentDate.getMinutes();
    min = (Math.ceil(min / 15) + 1) * 15;
    if (min > 60) {
      currentDate.setHours(currentDate.getHours() + 1, 15, 0, 0);
    } else {
      currentDate.setMinutes(min, 0, 0);
    }
  }
  var i = 0;
  var element = bookings[i];
  var s=element.StartDate;
  var closestBooking = new Date()
  closestBooking.setFullYear(s.substring(0,4), s.substring(5,7)-1, s.substring(8,10));
  closestBooking.setHours(s.substring(11, 13), s.substring(14, 16), 0, 0);

  while(currentDate <= bookingUntilDate){
    console.log(closestBooking-currentDate+" b-c"+closestBooking.getHours()+":"+closestBooking.getMinutes()+" "+currentDate.getHours()+":"+currentDate.getMinutes());
    if(closestBooking-currentDate <= 15 && closestBooking.getHours() != 0)
    {
      console.log("<15");
      currentDate.setHours(element.FinishDate.substring(11, 13), element.FinishDate.substring(14, 16));
      if(i+1 < bookings.length){
        i++;
        element = bookings[i];
      console.log(element.StartDate+" element <15");
      s=element.StartDate;
      closestBooking.setFullYear(s.substring(0,4), s.substring(5,7)-1, s.substring(8,10));
      closestBooking.setHours(s.substring(11, 13), s.substring(14, 16), 0, 0);
      }
      else{
        closestBooking.setFullYear(bookingUntilDate.getFullYear(), bookingUntilDate.getMonth(), bookingUntilDate.getDate());
        closestBooking.setHours(bookingUntilDate.getHours(), bookingUntilDate.getMinutes(), 0, 0);
      }
    }
    time.push(currentDate);
    currentDate = new Date(currentDate.getTime() + 15 * 60000);
  }

  console.log("timearray created");
  for(var i = 0; i < time.length; i++){
    console.log(time[i]);
  }
  return; 
}
function TimeArrayTo(){
  
}
export default withStyles(styles)(ReserveDevice);

