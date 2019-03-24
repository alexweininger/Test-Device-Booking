import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import App from "../../App";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputFile from "@material-ui/core/Input/Input";
import BackArrow from "@material-ui/icons/ArrowBack";
import Header from '../Layout/Header';
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
    value: "Active",
    label: "Active"
  },
  {
    value: "Not_Active",
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
const Offices = [
  {
    value: "Lithuania",
    label: "Lithuania"
  },
  {
    value: "USA",
    label: "USA"
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe"
  }
];

class NewDevice extends Component {
  ReturnBack() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }
  constructor() {
    super();
    this.state = {
      Active: "",
      Brand: "",
      Model: "",
      Office: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  AddDevice() {
    console.log("Device Added");
  }
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <form>
          <Header/>
          <Paper className={classes.layout}>
            <TextField
            id="standard-select-Active"
            select
            label="Select Device Activity"
            className={classes.textField}
            value={this.state.Active}
            onChange={this.handleChange("Active")}
          >
            {Activity.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Name"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <TextField
            id="standard-select-Brand"
            select
            label="Select Brand"
            className={classes.textField}
            value={this.state.Brand}
            onChange={this.handleChange("Brand")}
          >
            {Brands.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-Model"
            select
            label="Select Model"
            className={classes.textField}
            value={this.state.Model}
            onChange={this.handleChange("Model")}
          >
            {Models.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="Month/Year"
            label="Month/Year"
            type="month"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Serial Number"
            className={classes.textField}
            value={this.state.value}
            onChange={this.handleChange}
          />
        <TextField
          label="OS"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TextField
          label="Category"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TextField
          label="Subcategory"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TextField
          id="standard-select-OfficeID"
          select
          label="Select Office"
          className={classes.textField}
          value={this.state.Office}
          onChange={this.handleChange("Office")}
        >
          {Offices.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="Purchased_on"
          label="Purchased on"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          label="Vendor"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <TextField
          label="Tax Rate"
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div>
          <TextField
            id="Description"
            label="Description"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
          />
        </div>
        <InputFile
          accept="image/*"
          className={classes.input}
          id="File"
          multiple
          type="file"
        />
        <div>
          <Button variant="contained" color="primary" onClick={this.ReturnBack}>
            Return
            <BackArrow />
          </Button>
          <Button variant="contained" color="primary" onClick={this.AddDevice}>
            Submit
          </Button>
         </div>
        </Paper>
      </form>
    );
  }
}
export default withStyles(styles)(NewDevice);
