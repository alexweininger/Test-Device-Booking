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
import PropTypes from "prop-types";

var date = new Date();
var time = [];
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
      bookings: [],
      open: false,
      selectedTime: "",
      booked: {
        startDate: new Date().setMonth(date.getMonth + 1),
        finishDate: new Date().setMonth(date.getMonth + 1),
        ID: "2",
        sNumber: this.props.sNumber
      }
    };
  }
  handleClickOpen = sNumber => {
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
    this.state.booked.sNumber = sNumber;
    this.getTodaysBookings();
    bkngs = this.state.bookings;
    setTimeout(this.getClosestBooking, 900);
    setTimeout(this.timeArray, 3000);
    ID = sNumber;
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOk = event => {
    this.setState({ open: false });
    this.addReserved(this.state.booked);
  };
  handleTimeChange = event => {
    var d = event.target.value;
    this.setState({ selectedTime: event.target.value });
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
    const bookings = this.state.bookings || [];
    const { classes, sNumber } = this.props;
    return (
      <div>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={() => this.handleClickOpen(sNumber)}
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
              <BookingsTable ID={ID} bookings={bookings} />
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
      </div>
    );
  }

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
        //if we successfully updated the DB

        if (result.success) {
          console.log("Reservation successfully added");
        }
      });
    return true;
  }
  getClosestBooking() {
    console.log("Getting Closest Booking");
    console.log(bkngs.length);
    for (var e = 0; e < bkngs.length; e++) {
      var element = bkngs[e];
      var start = element.StartDate;
      var finish = element.FinishDate;
      var s = new Date();
      var f = new Date();
      s.setHours(start.substring(11, 13), start.substring(14, 16));
      f.setHours(finish.substring(11, 13), finish.substring(14, 16));
      console.log(s, " booking Start");
      console.log(f, " booking Finish");
      if (s <= date && f > date) {
        console.log("0");
        closestBooking = 0;
        return;
      }
      if (s >= date) {
        console.log(s);
        closestBooking = s;
        return;
      }
    }
    console.log("1");
    closestBooking = 1;
    return;
  }

  timeArray() {
    time = [];

    console.log("closestBooking ", closestBooking);
    console.log("");
    var currentDate = date;
    var bookingUntilDate = new Date();

    if (closestBooking == 0) {
      return time;
    }
    if (closestBooking == 1) {
      bookingUntilDate.setDate(date.getDate() + 1);
      bookingUntilDate.setHours(0);
      bookingUntilDate.setMinutes(0);
      console.log("booking until: ", bookingUntilDate);
      console.log("");
    } else {
      bookingUntilDate = closestBooking;
      console.log("booking until: ", bookingUntilDate);
      console.log("");
    }
    var min = currentDate.getMinutes();
    min = (Math.ceil(min / 15) + 1) * 15;
    if (min > 60) {
      currentDate.setHours(currentDate.getHours() + 1, 15);
    } else {
      currentDate.setMinutes(min);
    }

    while (bookingUntilDate - currentDate > 0) {
      time.push(currentDate);
      currentDate = new Date(currentDate.getTime() + 15 * 60000);
    }

    console.log("timearray created");
    for (var i = 0; i < time.length; i++) {
      console.log(time[i]);
    }
    return time;
  }
}

export { ID };
export { time };

BookDevice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookDevice);
