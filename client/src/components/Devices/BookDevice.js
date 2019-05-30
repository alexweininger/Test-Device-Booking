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
import NewDevice from "../../App";
import ReactDOM from "react-dom";
var date = new Date();

//var time = [];
var ID = "0";
var bkngs = [];
var closestBooking;
const styles = theme => ({
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  content: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%"
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 90
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 70
  }
});

class BookDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: [],
      bookings: [],
      open: false,
      selectedTime: "",
      date: new Date(),
      userBooking: localStorage.getItem("userBookings"),
      userFinishDate: localStorage.getItem("userFD"),
      booked: {
        today: new Date(),
        startDate: new Date().setMonth(date.getMonth + 1),
        finishDate: new Date().setMonth(date.getMonth + 1),
        userID: localStorage.getItem("userId"),
        sNumber: this.props.sNumber
      }
    };
    this.getTodaysBookings();
  }

  isDisabled(){
    var dif = 0;
    var fDate = new Date();
    var s = parseInt(this.props.sNumber, 10);
    var finish = this.state.userFinishDate;
    var fDate = new Date();
    if(finish == null)
    {
      if (!this.props.available) {
        return true;
      }
      return false;
    }
    
    else {
      fDate.setHours(finish.substring(11, 13), finish.substring(14, 16), 0, 0);
      var dif = (fDate-date)/60000;
      if(s == this.state.userBooking && dif <15){
        console.log(dif+"     DIF");
        console.log(date);
        console.log(fDate);
        console.log("+++++++++++++++++++");
        return false;
      }
      else if(this.state.userBooking != null)
      {
        console.log(dif+"     DIF");
        console.log(date);
        console.log(fDate);
        console.log("+++++++++++++++++++");
        return true;
        
      }
      else if (!this.props.available) {
         return true;
       } else{
         return false;
       }
    }
    
  }
  getButtonText(){
    var s = parseInt(this.props.sNumber, 10);
    if(s == this.state.userBooking){
      return "Return Device";
    }
    else if (!this.props.available) {
       return "Book Device";
     } else{
       return "Book Device";
     }
  }
  handleClickOpen = () => {
    if (this.props.available) {
      date = new Date();
      this.setState({ open: true });
      this.state.booked.startDate =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
    } else {
      localStorage.removeItem('userBookings');
      this.returnDevice(this.state.booked);
    }
    ID = this.state.booked.sNumber;
    console.log(ID + " ID");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = event => {
    this.setState({ open: false });
    this.updateAvailability(this.state.booked);
  };
  handleTimeChange = event => {
    this.setState({ selectedTime: event.target.value });
    var d = event.target.value;
    this.state.booked.finishDate =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
  };

  render() {
    const buttonText = this.getButtonText();
    const isDisabled = this.isDisabled();
    const bookings = this.state.bookings || [];
    const { classes, sNumber, available } = this.props;
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={() => this.handleClickOpen(sNumber)}
          style={{ height: 60 }}
          disabled={isDisabled}
          
        >
          {buttonText}
        </Button>

        {available ? (
          <Dialog
            className={classes.dialog}
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle id="alert-dialog-title">
              {"Book device"} {ID}
              <DialogContent className={classes.content}>
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
                <BookingsTable ID={ID} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleOk} color="inherit">
                  OK
                </Button>
                <Button onClick={this.handleClose} color="inherit" autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </DialogTitle>
          </Dialog>
        ) : (
          ""
        )}
      </div>
    );
  }
 /* getUserBookings() {
    var id = localStorage.getItem("userId");
    const request = new Request(
      `/get_userBookings/${id}`,
      {
        method: "GET"
      }
    );

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(bookings => {
            console.log(bookings);

            this.setState({ userBookings: bookings });
            console.log("loaded all user bookings");
            return bookings;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in get user bookings", err);
        console.log("get failed");
      });
  }*/
  getTodaysBookings() {
    const request = new Request(
      `/get_dayBookings/${this.state.booked.sNumber}`,
      {
        method: "GET"
      }
    );

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(obj => {
            console.log(obj);

            this.setState({ bookings: obj });
            bkngs = obj;
            console.log("loaded all bookings");
            this.getClosestBooking();
            return obj;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in getTodaysBookings", err);
        console.log("get failed");
      });
  }
  returnDevice(reserved) {
    console.log("called_");
    const request = new Request("/return_device", {
      method: "POST",
      body: JSON.stringify(reserved),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        //if we successfully updated the DB

        if (result.success) {
          console.log("Device successfully returned");
          window.location.reload();
        }
      });
    return true;
  }
  addBooking(reserved) {
    console.log("called_");
    const request = new Request("/new_booking", {
      method: "POST",
      body: JSON.stringify(reserved),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        //if we successfully updated the DB

        if (result.success) {
          console.log("Booking successfully added");
          window.location.reload();
        }
      });
    return true;
  }
  updateAvailability(booked) {
    console.log(booked.startDate);
    console.log(booked.finishDate);
    console.log(booked.sNumber);
    console.log(booked.userID);
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
          this.addBooking(booked);
        }
      });
    return true;
  }
  getClosestBooking() {
    console.log("Getting Closest Booking");
//    console.log(bkngs.length);
    for (var e = 0; e < bkngs.length; e++) {
      var element = bkngs[e];
      var start = element.StartDate;
      var finish = element.FinishDate;
      var s = new Date();
      var f = new Date();
      s.setHours(start.substring(11, 13), start.substring(14, 16), 0, 0);
      f.setHours(finish.substring(11, 13), finish.substring(14, 16), 0, 0);
  //    console.log(s, " booking Start");
  //    console.log(f, " booking Finish");
      if (s <= date && f > date) {
        console.log("0");
        closestBooking = 0;
        this.state.time = this.timeArray();
        return;
      }
      if (s >= date) {
 //       console.log(s);
        closestBooking = s;
        this.state.time = this.timeArray();
        return;
      }
    }
 //   console.log("1");
    closestBooking = 1;
    this.state.time = this.timeArray();
    return;
  }

  timeArray() {
    var time = [];

 //   console.log("closestBooking ", closestBooking);
 //   console.log("");
    var currentDate = new Date();
    var bookingUntilDate = new Date();

    if (closestBooking == 0) {
      return time;
    }
    if (closestBooking == 1) {
      bookingUntilDate.setDate(date.getDate() + 1);
      bookingUntilDate.setHours(0);
      bookingUntilDate.setMinutes(0);
 //     console.log("booking until: ", bookingUntilDate);
 //     console.log("");
    } else {
      bookingUntilDate = closestBooking;
 //     console.log("booking until: ", bookingUntilDate);
 //     console.log("");
    }
    var min = currentDate.getMinutes();
    min = (Math.ceil(min / 15) + 1) * 15;
    if (min > 60) {
      currentDate.setHours(currentDate.getHours() + 1, 15);
    } else {
      currentDate.setMinutes(min);
    }

    while (bookingUntilDate - currentDate >= 0) {
      time.push(currentDate);
      currentDate = new Date(currentDate.getTime() + 15 * 60000);
    }

    console.log("timearray created");
    for (var i = 0; i < time.length; i++) {
      //console.log(time[i]);
    }
    return time;
  }
}

function timeArray_test(date, closestBooking) {
  var time = [];

  var currentDate = date;
  var bookingUntilDate = date;

  if (closestBooking == 0) {
    return time;
  }
  if (closestBooking == 1) {
    bookingUntilDate.setDate(date.getDate() + 1);
    bookingUntilDate.setHours(0);
    bookingUntilDate.setMinutes(0);
  } else {
    bookingUntilDate = closestBooking;
  }
  var min = currentDate.getMinutes();
  min = (Math.ceil(min / 15) + 1) * 15;
  if (min > 60) {
    currentDate.setHours(currentDate.getHours() + 1, 15);
  } else {
    currentDate.setMinutes(min);
  }

  while (bookingUntilDate - currentDate >= 0) {
    time.push(currentDate);
    currentDate = new Date(currentDate.getTime() + 15 * 60000);
  }
  for (var i = 0; i < time.length; i++) {
    //console.log(time[i]);
  }
  return time;
}

export { ID };
//export { time };
export { timeArray_test };

export default withStyles(styles)(BookDevice);
