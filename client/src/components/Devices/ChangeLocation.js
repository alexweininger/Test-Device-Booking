import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import App from "../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import BackArrow from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import DeviceInfo from "./DeviceInfo";
import { truncateSync } from "fs";
import Header from "../Layout/Header";
import TabMenu from "../Layout/TabMenu";

const styles = theme => ({
  layout: {
    width: "auto",
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
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
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class ChangeLocation extends Component {
  ReturnBack() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  constructor() {
    super();

    this.getOfficesFromDb();

    this.state = {
      device: {
        Serial_Number: "325926441",
        fk_office_id: "1"
      },
      offices: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.UpdateDevice = this.UpdateDevice.bind(this);
  }

  handleChange = (officeId, serNumber, deviceSerNum) => event => {
    console.log(event.target.value);
    let id = Number(event.target.value);
    this.state.device[officeId] = id;
    this.state.device[serNumber] = deviceSerNum;

    this.setState(this.state);
  };

  /* send device to server to be added to database
   */
  UpdateDevice() {
    console.log(this.state.device);

    //send office to the DB
    const request = new Request("/update_Location", {
      method: "POST",
      body: JSON.stringify(this.state.device),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        this.props.updateDeviceInfo(this.state);
      });
  }

  render() {
    console.log(this.state);
    const {
      classes,
      Brand,
      Model,
      OS,
      Serial_Number,
      Category,
      Subcategory
    } = this.props;

    return (
      <form>
        <Header/>
        <TabMenu/>
        <Paper className={classes.layout}>
          {/*Device brand*/}
          <TextField
            disabled={true}
            label="Brand"
            className={classes.textField}
            value={Brand}
            onChange={this.handleChange("Brand")}
          />
          {/*Device model*/}
          <TextField
            disabled={true}
            label="Model"
            className={classes.textField}
            value={Model}
          />

          {/*Device Serial Number*/}
          <TextField
            disabled={true}
            label="Serial Number"
            className={classes.textField}
            value={Serial_Number}
          />

          {/*Device os*/}
          <TextField
            disabled={true}
            label="OS"
            className={classes.textField}
            value={OS}
          />

          {/*Device category*/}
          <TextField
            disabled={true}
            label="Category"
            className={classes.textField}
            value={Category}
          />

          {/*Device subcategory*/}
          <TextField
            disabled={true}
            label="Subcategory"
            className={classes.textField}
            value={Subcategory}
          />

          <TextField
            id="standard-select-OfficeID"
            select
            label="Select Office"
            className={classes.textField}
            value={this.state.device.fk_office_id}
            onChange={this.handleChange(
              "fk_office_id",
              "Serial_Number",
              `${Serial_Number}`
            )}
          >
            {/*map offices to selectable options*/}
            {Object.keys(this.state.offices).map(id => (
              <MenuItem key={id} value={id}>
                {this.state.offices[id].address +
                  " " +
                  this.state.offices[id].city}
              </MenuItem>
            ))}
          </TextField>

          {/*Buttons to return to list or add device*/}
          <div>
            <NavLink to="/">
              <Button
                variant="contained"
                color="primary"
                onClick={this.ReturnBack}
              >
                Return
                <BackArrow />
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button
                variant="contained"
                color="primary"
                onClick={this.UpdateDevice}
              >
                Submit
              </Button>
            </NavLink>
          </div>
        </Paper>
      </form>
    );
  } //render

  /* Gets all the offices from the db, then updates the Offices object.
   */
  getOfficesFromDb() {
    const request = new Request("/get_offices", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    // Create a list to return.
    let rtrnList = {};

    fetch(request)
      .then(res => res.json())
      .then(result => {
        //if success then update the office list
        if (result.success) {
          const officeList = result.offices;
          // Reformat the offices by iterating through them all
          let office, i;
          for (i in officeList) {
            office = officeList[i]; // current office pointer
            rtrnList[i] = {
              id: office.id_Office,
              country: office.Country,
              city: office.City,
              address: office.Address
            };
          }

          //update the office
          this.setState({ offices: rtrnList });
        } else {
          console.log("Error");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
export default withStyles(styles)(ChangeLocation);
