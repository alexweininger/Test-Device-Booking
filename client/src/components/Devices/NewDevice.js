import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import App from "../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputFile from "@material-ui/core/Input/Input";
import BackArrow from "@material-ui/icons/ArrowBack";
import Header from "../Layout/Header";
import Paper from "@material-ui/core/Paper";

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
const Activity = [
  {
    value: 1,
    label: "Active"
  },
  {
    value: 0,
    label: "Not Active"
  }
];
const Brands = [
  {
    value: "Samsung",
    label: "Samsung"
  },
  {
    value: "Xiaomi",
    label: "Xiaomi"
  },
  {
    value: "Blackberry",
    label: "Blackberry"
  }
];
const Models = [
  {
    value: "First",
    label: "First"
  },
  {
    value: "Oldest",
    label: "Oldest"
  },
  {
    value: "Classic",
    label: "Classic"
  }
];

class NewDevice extends Component {
  ReturnBack() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  constructor() {
    super();

    this.getOfficesFromDb();

    this.state = {
      device: {
        Status: 0,
        Name: "Test",
        Brand: "",
        Model: "First",
        Serial_Number: "9878975",
        OS: "Android",
        Category: "Phone",
        Subcategory: "Smart Phone",
        fk_office_id: "1",
        Vendor: "Amazon",
        Tax_rate: "8%",
        Description: "This is a test",
        Image: ""
      },
      offices: {}
    };
    this.state.device["Release_date"] = "2019-02";
    this.state.device["Purchased_on"] = "2019-03-12";

    this.handleChange = this.handleChange.bind(this);
    this.AddDevice = this.AddDevice.bind(this);
  }

  handleChange = name => event => {
    console.log(event.target.value);
    this.state.device[name] = event.target.value;
    this.setState(this.state);
  };

  /* send device to server to be added to database
   */
  AddDevice() {
    console.log(this.state.device);

    //send office to the DB
    const request = new Request("/new_device", {
      method: "POST",
      body: JSON.stringify(this.state.device),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        this.ReturnBack();
      });
  }

  render() {
    console.log(this.state);
    const { classes } = this.props;

    return (
      <form>
        <Header />
        <Paper className={classes.layout}>
          {/*Active/inactive selector*/}
          <TextField
            id="standard-select-Active"
            select
            label="Select Device Activity"
            className={classes.textField}
            value={this.state.device.Status}
            onChange={this.handleChange("Status")}
          >
            {Activity.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/*Device name*/}
          <TextField
            label="Name"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Name")}
          />

          {/*Device os*/}
          <TextField
            label="Image"
            className={classes.textField}
            value={this.state.device.Image}
            onChange={this.handleChange("Image")}
          />
          {/*Device brand*/}
          <TextField
            label="Brand"
            className={classes.textField}
            value={this.state.device.Brand}
            onChange={this.handleChange("Brand")}
          />

          {/*Device model*/}
          <TextField
            id="standard-select-Model"
            select
            label="Select Model"
            className={classes.textField}
            value={this.state.device.Model}
            onChange={this.handleChange("Model")}
          >
            {Models.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/*Device date*/}
          <TextField
            id="Month/Year"
            label="Month/Year"
            type="month"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("Release_date")}
          />

          {/*Device Serial Number*/}
          <TextField
            label="Serial Number"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Serial_Number")}
          />

          {/*Device os*/}
          <TextField
            label="OS"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("OS")}
          />

          {/*Device category*/}
          <TextField
            label="Category"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Category")}
          />

          {/*Device subcategory*/}
          <TextField
            label="Subcategory"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Subcategory")}
          />

          {/*Office to associate this device with*/}
          <TextField
            id="standard-select-OfficeID"
            select
            label="Select Office"
            className={classes.textField}
            value={this.state.device.fk_office_id}
            onChange={this.handleChange("fk_office_id")}
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

          {/*Purchase date*/}
          <TextField
            id="Purchased_on"
            label="Purchased on"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleChange("Purchased_on")}
          />

          {/*Device vendor*/}
          <TextField
            label="Vendor"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Vendor")}
          />

          {/*Tax rate on device*/}
          <TextField
            label="Tax Rate"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange("Tax_rate")}
          />

          {/*Extra large input block for device description*/}
          <div>
            <TextField
              id="Description"
              label="Description"
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange("Description")}
            />
          </div>

          {/*File chooser -- to choose the image? */}
          {/*TODO -- implement device image*/}
          {/*<InputFile
            accept="image/*"
            className={classes.input}
            id="File"
            multiple
            type="file"
          />*/}

          {/*Buttons to return to list or add device*/}
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={this.ReturnBack}
            >
              Return
              <BackArrow />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.AddDevice}
            >
              Submit
            </Button>
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
export default withStyles(styles)(NewDevice);
