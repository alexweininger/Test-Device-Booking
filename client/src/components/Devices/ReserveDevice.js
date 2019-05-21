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
  TimePicker,
  DatePicker
} from "material-ui-pickers";

var today = new Date();
var time = [];

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
      closestBooking: [],
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
    time=[];
    if(date.getDate() != today.getDate() || 
      date.getFullYear() != today.getFullYear() || 
      date.getMonth() != today.getMonth()){
        date.setHours(0, 0, 0);
    }
    console.log("dateChanging");
    this.setState({selectedDateTo: date});
    this.setState({selectedDateFrom: date});
    console.log("dateChanged");
    console.log("Accept");
    this.setState({ bookings: this.getBookings(date, timeArrayFrom)});
   // this.render();
   // console.log(this.state.selectedDateFrom);
    
    console.log("Accepted");
};
handleDateChangeTo = date => {
  console.log(this.state.selectedDateFrom);
    this.setState({selectedDateTo: date});
};
  handleTimeChangeFrom = event =>{
    this.setState({selectedDateFrom: event.target.value});
    this.setState({closestBooking: this.getClosestBooking});
  }
  handleTimeChangeTo = event =>{
    this.setState({selectedDateTo: event.target.value});
  }
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
  getBookings(date, callback) {
    console.log(date+"getBookings");
    var query = createQueryDayBookings(date, this.props.sNumber)
    const request = new Request(`/get_Booking/` + query,
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
            callback(date, this.state.bookings);
            return obj;
          });
        }
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
          res.json().then(obj => {
            console.log(obj);

            this.setState({ closestBooking: obj });
            console.log("loaded closest booking");
            return obj;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in getDevices", err);
        console.log("get failed");
      });
  }
}

function createQueryClosestBooking(date, id){
  return("WHERE year(StartDate)>"+date.getFullYear()+
  " AND month(StartDate)>"+(date.getMonth()+1)+
  " AND day(StartDate)>"+date.getDate()+
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
function timeArrayFrom(d, bookings) {

  var currentDate = new Date();
  var bookingUntilDate = new Date();
  bookingUntilDate.setDate(d.getDate() + 1);
  bookingUntilDate.setHours(0, 0, 0);
  if(d.getDate() != currentDate.getDate() || currentDate.getFullYear() != d.getFullYear() || currentDate.getMonth() != d.getMonth())
  {
    currentDate.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
    currentDate.setHours(0, 0, 0);
  }
  else{
    var min = d.getMinutes();
    min = (Math.ceil(min / 15) + 1) * 15;
    if (min > 60) {
      currentDate.setHours(d.getHours() + 1, 15, 0, 0);
    } else {
      currentDate.setMinutes(min, 0, 0);
    }
  }
  
  
  if(bookings.length > 0)
  {
    console.log("bookings");
    console.log(currentDate);
    console.log("bookingslength>0");
    var i = 0;
    var element = bookings[i];
    var s=element.StartDate;
    var closestBooking = new Date()
    closestBooking.setFullYear(s.substring(0,4), s.substring(5,7)-1, s.substring(8,10));
    closestBooking.setHours(s.substring(11, 13), s.substring(14, 16), 0, 0);
    console.log(s+" s");
    console.log(closestBooking+" closest");

    while(currentDate <= bookingUntilDate){
      console.log(closestBooking-currentDate+" b-c"+closestBooking.getHours()+":"+closestBooking.getMinutes()+" "+currentDate.getHours()+":"+currentDate.getMinutes());
      if(closestBooking-currentDate <= 15 && closestBooking.getHours() != 0)
      {
  //      console.log("<15");
        currentDate.setHours(element.FinishDate.substring(11, 13), element.FinishDate.substring(14, 16));
        if(i+1 < bookings.length){
          i++;
          element = bookings[i];
   //     console.log(element.StartDate+" element <15");
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
  }
  else{
    console.log(currentDate+" cd");
    while(currentDate <= bookingUntilDate){
      time.push(currentDate);
      currentDate = new Date(currentDate.getTime() + 15 * 60000);
    }
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

