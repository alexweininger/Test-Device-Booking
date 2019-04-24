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

var date = new Date();
var time = [];
var ID = "0";

const styles = theme => ({
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  content: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%'
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
    date: new Date(),
    booked: {
      startDate: new Date(),
      finishDate: "",
      ID: "2",
      sNumber: this.props.deviceId
    },
  };

  handleClickOpen = (deviceId) => {
    this.setState({ open: true });
    this.setState({booked:{startDate: new Date()}});
    timeArray();
    ID=deviceId;
  };

  handleClose = () => {
    this.setState({ open: false });
    this.addReserved();
  };

  handleOk = event => {
    this.setState({ booked: {sNumber: event.target.deviceId} });
    this.addReserved(this.state.booked);
  }
  handleTimeChange = event => {
    console.log(event.target.value);
    this.setState({date: event.target.value});
    this.setState({booked: { finishDate: event.target.value}});

   // console.log(finish+" converted f");
    console.log(this.state.booked.finishDate+ "  fdate");
  };

  render() {
    const { classes, deviceId } = this.props;
    return (
      
      <div>
        <Button
          size="large"
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={() => this.handleClickOpen(deviceId)}
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
                value={this.state.booked.finishDate}
                onChange={this.handleTimeChange}
                className={classes.input}
                color="inherit"
              >
                {time.map((t, index) => (
                  <MenuItem key={index} value={t} selected={index === "Pyxis"} InputLabel={(t.getHours()<10?'0':'')+t.getHours()+":"+(t.getMinutes()<10?'0':'')+t.getMinutes()}>
                    {(t.getHours()<10?'0':'')+t.getHours()+":"+(t.getMinutes()<10?'0':'')+t.getMinutes()}
                  </MenuItem>
                ))}
              </Select>
              
              <BookingsTable ID={ID}/>
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

function timeArray() {
  date = new Date();
  time = [];
  var h = date.getHours();
  var min = date.getMinutes();

  min = (Math.ceil(min / 15) + 1) * 15;
  if (h==24){
    var d = new Date();
    d.setHours(h);
    d.setMinutes(min);
    time.push(d);
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
    time.push(d);
    min += 15;
  }
 // return time;
}



export {ID};

BookDevice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookDevice);
