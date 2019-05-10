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
import { setMonth } from "date-fns/esm";

var date = new Date();
var time = [];
var ID = "0";
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
    var date = new Date();
    this.setState({ open: true });
    this.state.booked.startDate = 
    date.getFullYear() +
    "-" +
    (date.getMonth()+1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
    this.state.booked.sNumber = sNumber;
    time = timeArray(date);
    ID = sNumber;
    console.log(this.state.booked.sNumber + "  sNumber");
    console.log(this.state.booked.startDate + "  sdate");
    console.log(this.state.booked.finishDate + "  fdate");
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
    console.log(event.target.value);
    this.setState({selectedTime : event.target.value});
    this.state.booked.finishDate = 
      d.getFullYear() +
      "-" +
      (date.getMonth()+1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();

    // console.log(finish+" converted f");
    console.log(this.state.booked.sNumber + "  sNumber");
    console.log(this.state.booked.startDate + "  sdate");
    console.log(this.state.booked.finishDate + "  fdate");
  };

  render() {
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
      </div>
    );
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
  getTodaysBookings() {
    const request = new Request(`/get_dayBookings/${this.state.Id}`, {
      method: "GET"
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        console.log("result ", result);
        if (result.success) {
          this.setState({
            bookings: result.bookings
          });
        }
      });
  }
}

function timeArray(date) {
  var newTime = [];
  var h = date.getHours();
  var min = date.getMinutes();

  min = (Math.ceil(min / 15) + 1) * 15;
  if (h == 24) {
    var d = new Date();
    d.setHours(h);
    d.setMinutes(min);
    newTime.push(d);
  }
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
    newTime.push(d);
    min += 15;
  }
  return newTime;
}

export { ID };
export { timeArray };

BookDevice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookDevice);
