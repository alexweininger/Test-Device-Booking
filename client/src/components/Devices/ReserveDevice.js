import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
//import ReservationsTable from "./ReservationsTable";
import {
  MuiPickersUtilsProvider,
  DatePicker
} from "material-ui-pickers";
var dateFormat = require('dateformat');
var today = new Date();

const styles = theme => ({
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 85
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
      maxDate: new Date().setFullYear(today.getFullYear()+1),
      bookings: [],
      timeArray: [],
      timeArrayTo: [],
      userBooking: localStorage.getItem("userReservation"),
      open: false,
      selectedDateFrom: new Date(),
      selectedDateTo: new Date(),
      selectedTimeFrom: "",
      selectedTimeTo: "",
      reserved: {
        startDate: "",
        finishDate: "",
        userId: localStorage.getItem("userId"),
        sNumber: this.props.sNumber
      },
    };
  }
  buttonText(){
    var s = parseInt(this.props.sNumber, 10);
    if(this.props.available && s == this.state.userBooking)
    {
      return "Check in";
    }
    else return "Reserve";
  }
  handleDateChangeFrom = date => {

    if(date.getDate() != today.getDate() || 
      date.getFullYear() != today.getFullYear() || 
      date.getMonth() != today.getMonth()){
        date.setHours(0, 0, 0);
    }
    else{
      date.setHours(today.getHours(), today.getMinutes(), 0);
    }
    this.setState({maxDate: new Date().setFullYear(today.getFullYear()+1)});
    this.setState({ startDate: date});
    this.setState({selectedDateTo: date});
    this.setState({selectedDateFrom: date});

    this.getBookings(date);
  }
  handleDateChangeTo = date => {
    if(date.getDate() != today.getDate() || 
        date.getFullYear() != today.getFullYear() || 
        date.getMonth() != today.getMonth()){
          date.setHours(0, 0, 0);
          
    }
    else{
      date.setHours(this.state.selectedDateFrom.getHours(), this.state.selectedDateFrom.getMinutes(), 0);
    }
    this.setState({selectedDateTo: date}, () => 
    this.timeArrayTo(date, this.state.closestBooking));
  }

  handleTimeChangeFrom = event =>{
    var t = event.target.value;
    this.setState({selectedDateFrom: t}, () => 
    this.getClosestBooking(t),);
    this.setState({selectedTimeFrom: t});
  }

  handleTimeChangeTo = event =>{
    var dateFrom = this.state.selectedDateFrom;
    var t = event.target.value;
    this.setState({selectedDateTo: t});
    this.setState({selectedTimeTo: t});
    this.setState({reserved:{
      startDate: 
      dateFrom.getFullYear() +
      "-" +
      (dateFrom.getMonth() + 1) +
      "-" +
      dateFrom.getDate() +
      " " +
      dateFrom.getHours() +
      ":" +
      dateFrom.getMinutes() +
      ":00",
      finishDate: t.getFullYear() +
      "-" +
      (t.getMonth() + 1) +
      "-" +
      t.getDate() +
      " " +
      t.getHours() +
      ":" +
      t.getMinutes() +
      ":00",
      sNumber: this.props.sNumber,
      userID: localStorage.getItem("userId")
    }})
  }

  handleClickOpen = () => {
    var s = parseInt(this.props.sNumber, 10);
    if(this.props.available && s == this.state.userBooking)
    {
      this.updateAvailability(this.state.reserved);
    }
    else {
    this.setState({ open: true });
    today = new Date();
    }
  };
  handleClose = () => {
    this.setState({ open: false });
    console.log(this.state.reserved.startDate);
    console.log(this.state.reserved.finishDate);
    console.log(this.state.reserved.userID);
    console.log(this.state.reserved.sNumber);
  };

  handleClickOk = () => {
    
    this.setState({ open: false });
    this.addReserved(this.state.reserved);
    
  };
    
  disableWeekends(date) {
      return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    const buttonText = this.buttonText();
    const { classes, sNumber, available } = this.props;
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
          {buttonText}
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
                    disablePast="true"
                    //shouldDisableDate={this.disableWeekends}
                />  
                <Select
                value={this.state.selectedTimeFrom}
                onChange={this.handleTimeChangeFrom}
                className={classes.input}
                color="inherit"
              >
                {this.state.timeArray.map((t, index) => (
                  <MenuItem
                    key={index}
                    value={t}
                    selected={t === "Pyxis"}
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
                    minDate={this.state.selectedDateFrom}
                    maxDate={this.state.maxDate}
                    value={this.state.selectedDateTo}
                    selected={this.state.selectedDateTo}
                    selectsEnd
                    startDate={this.state.selectedDateFrom}
                    endDate={this.state.selectedDateTo}
                    onChange={this.handleDateChangeTo}
                    //shouldDisableDate={this.disableWeekends}
                    
                />  
                <Select
                value={this.state.selectedTimeTo}
                onChange={this.handleTimeChangeTo}
                className={classes.input}
                color="inherit"
              >
                {this.state.timeArrayTo.map((t) => (
                  <MenuItem
                    key={t}
                    value={t}
                    selected={t === "Pyxis"}
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
              <Button onClick={this.handleClickOk} color="inherit">
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
  updateAvailability(booked) {
    console.log("called_");
    const request = new Request("/update_DeviceAvailability", {
      method: "POST",
      body: JSON.stringify(booked),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        //if we successfully updated the DB

        if (result.success) {
          console.log("Availability updated");
          window.location.reload();
        }
      });
    return true;
  }
  getBookings(date) {
    var query = createQueryDayBookings(date, this.props.sNumber)
    const request = new Request(`/get_Booking/` + query,
      {
        method: "GET"
      }
    );
  
     return fetch(request)
      .then(res => {
        if (res.ok) {
          res.json().then( bookings => {
            console.log(bookings);
            console.log("loaded all bookings ReserveDevice");
            this.setState({bookings: bookings});
            this.timeArrayFrom(date, bookings);
          });
        }
        return [];
      })
      .catch(err => {
        console.log("Error in getTodaysBookings", err);
        console.log("get failed");
      });
  }

  getClosestBooking(date) {
    console.log("closestBooking");
    var query = createQueryClosestBooking(date, this.props.sNumber);
    const request = new Request("/get_closestBooking/" + query, {
      method: "GET"
    });

    fetch(request)
      .then(res => {
        if (res.ok) {
          res.json().then(closestB => {

            console.log(closestB[0]+"closest1");
            if(closestB.length > 0){
              var s = new Date();
              var start = closestB[0].StartDate;
              s.setFullYear(start.substring(0,4), start.substring(5,7)-1, start.substring(8,10));
              s.setHours(start.substring(11, 13), start.substring(14, 16), 0, 0)
              this.setState({ closestBooking: closestB});
              this.setState({maxDate: s})
            }
            
            else
            this.setState({ closestBooking: null});
            console.log("loaded closest booking");
            return closestB;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in getDevices", err);
        console.log("get failed");
      });
  }

  timeArrayFrom(d, bookings) {
    console.log("timeArray from date: "+d);
    var time = []

    var bookingUntilDate = new Date();
    bookingUntilDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    bookingUntilDate.setHours(0, 0, 0);

    if(d.getHours() != 0 && d.getMinutes() != 0){
      var min = d.getMinutes();
      min = (Math.ceil(min / 15)) * 15;
      if (min > 60) {
        d.setHours(d.getHours() + 1, 15, 0, 0);
      } else {
        d.setMinutes(min, 0, 0);
      }
    }
    
    while(d <= bookingUntilDate){
      time.push(d);
      d = new Date(d.getTime() + 15 * 60000);
    }
    var s=new Date();
    var f=new Date();
    for(var i = 0; i < bookings.length; i++){
      
      var e = bookings[i];
      var start=e.StartDate;
      var finish=e.FinishDate;

      s.setFullYear(start.substring(0,4), start.substring(5,7)-1, start.substring(8,10));
      s.setHours(start.substring(11, 13), start.substring(14, 16), 0, 0);
      f.setFullYear(finish.substring(0,4), finish.substring(5,7)-1, finish.substring(8,10));
      f.setHours(finish.substring(11, 13), finish.substring(14, 16), 0, 0);
      console.log("------------------------------------------------");
      console.log(s);
      console.log(f);
      console.log("------------------------------------------------");
      var j = 0;
      while(j < time.length)
      {
        var t = time[j];
        console.log(t);
        if((t>=s && f>t)) {
          time.splice(j,1);
          j--;
        }
        j++;
      }
      console.log("************************************************");
    }
    console.log("timearray created");

    this.setState({timeArray: time});
    return time; 
  }

  timeArrayTo(d, bookings) {
    var time = []
    var bookingUntilDate = new Date();
    bookingUntilDate.setDate(d.getDate() + 1);
    bookingUntilDate.setHours(0, 0, 0);

    if(bookings != null){
      var start = bookings[0].StartDate;
      bookingUntilDate.setFullYear(start.substring(0,4), start.substring(5,7)-1, start.substring(8,10));
      bookingUntilDate.setHours(start.substring(11, 13), start.substring(14, 16), 0, 0);
    }
    if(d.getHours() != 0 && d.getMinutes() != 0){
      var min = d.getMinutes();
      min = (Math.ceil(min / 15)+1) * 15;
      if (min > 60) {
        d.setHours(d.getHours() + 1, 15, 0, 0);
      } else {
        d.setMinutes(min, 0, 0);
      }
    }
    
    while(d <= bookingUntilDate){
      time.push(d);
      d = new Date(d.getTime() + 15 * 60000);
    }
    console.log("timearray created");

    this.setState({timeArrayTo: time});
    return time; 
  }

  addReserved(reserved) {
    console.log("called_");

    const request = new Request("/new_reserve", {
      method: "POST",
      body: JSON.stringify(reserved),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {

        if (result.success) {
          window.location.reload();
        }
      });

    return true;
  }
}

function createQueryClosestBooking(date, id){
  return("WHERE year(StartDate)>="+date.getFullYear()+
  " AND month(StartDate)>="+(date.getMonth()+1)+
  " AND day(StartDate)>="+date.getDate()+
  " AND time(StartDate)>=maketime("+date.getHours()+","+date.getMinutes()+","+date.getSeconds()+")"+
  " AND fk_device_ser_nr="+id);
}
function createQueryDayBookings(date, id){
  return("WHERE year(StartDate)="+date.getFullYear()+
  " AND month(StartDate)="+(date.getMonth()+1)+
  " AND day(StartDate)="+date.getDate()+
  " AND year(FinishDate)="+date.getFullYear()+
  " AND month(FinishDate)="+(date.getMonth()+1)+
  " AND day(FinishDate)="+date.getDate()+
  " AND fk_device_ser_nr="+id);
}

export default withStyles(styles)(ReserveDevice);

