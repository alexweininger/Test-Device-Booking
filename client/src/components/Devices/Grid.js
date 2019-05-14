import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Media from "./Media";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import ReactDOM from "react-dom";
import NewDevice from "./NewDevice.js";
import Grid from "@material-ui/core/Grid";
import Progress from "./Progress";
import Checkbox from "./Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Location from "./Location";
import Brands from "./Brands";

var locationSet = new Set();
var brandSet = new Set();
var availabilitySet = new Set();
var isCheckedLocation = [];
var isCheckedBrand = [];
var isCheckedAvailability = [];

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  fab: {
    position: "absolute",
    top: theme.spacing.unit * 20,
    right: theme.spacing.unit * 10
  },
  formControl: {
    width: "100%",
    margin: theme.spacing.unit * 3,
    overflowY: "auto",
    height: "7cm"
  },
  formControl2: {
    width: "100%",
    margin: theme.spacing.unit * 3,
    overflowY: "auto",
    height: "3cm"
  },
  selection: {
    backgroundColor: "#F6F6F6",
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    height: 820
  }
});

class TitlebarGridList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: []
    };

    this.getDevicesByFilter = this.getDevicesByFilter.bind(this);
    this.handleChange();
  }

  handleBrandChange = event => {
    brandSet = handleChecks(event.target.value, brandSet, isCheckedBrand);

    for (const checkbox of brandSet) {
      console.log(checkbox, "is selected brand ***.");
    }
  };

  handleLocationChange = event => {
    locationSet = handleChecks(
      event.target.value,
      locationSet,
      isCheckedLocation
    );

    for (const checkbox of locationSet) {
      console.log(checkbox, "is selected location ***.");
    }
  };

  handleAvailabilityChange = event => {
    availabilitySet = handleChecks(
      event.target.value,
      availabilitySet,
      isCheckedAvailability
    );
  };

  handleChange = () => {
    let locations = Array.from(locationSet);
    let brands = Array.from(brandSet);
    let availability = Array.from(availabilitySet);
    if (
      locations.length == 0 &&
      brands.length == 0 &&
      availability.length == 0
    ) {
      this.getDevicesFromServer();
    } else this.getDevicesByFilter();
  };

  render() {
    const { classes } = this.props;
    const devices = this.state.devices || [];
    return (
      <div className={classes.root}>
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="Add"
          onClick={() =>
            ReactDOM.render(<NewDevice />, document.getElementById("root"))
          }
          style={{ zIndex: 1 }}
        >
          <AddIcon />
        </Fab>

        <Grid container spacing={20}>
          <Grid
            onChange={this.handleChange}
            item
            xs={3}
            className={classes.selection}
          >
            <FormControl
              onChange={this.handleBrandChange}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel
                style={{ fontWeight: "bold", color: "#595959" }}
                disabled
              >
                BRANDS
              </FormLabel>
              <Brands checked={isCheckedBrand} />
            </FormControl>

            <FormControl
              onChange={this.handleLocationChange}
              component="fieldset"
              className={classes.formControl}
            >
              <FormLabel
                style={{ fontWeight: "bold", color: "#595959" }}
                disabled
              >
                LOCATION
              </FormLabel>
              <Location checked={isCheckedLocation} />
            </FormControl>
            <FormControl
              onChange={this.handleAvailabilityChange}
              component="fieldset"
              className={classes.formControl2}
            >
              <FormLabel
                style={{ fontWeight: "bold", color: "#595959" }}
                disabled
              >
                AVAILABILITY
              </FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={this.getDevicesFromServer}
                    label="Show all"
                    isChecked={isCheckedAvailability["Show all"]}
                  />
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    label="Available"
                    isChecked={isCheckedAvailability["Available"]}
                  />
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <Grid item xs={2.5} container spacing={0}>
              {devices.map(device => (
                <Media
                  text={device.Brand + " " + device.Model + " "}
                  text2={
                    "OS: " +
                    device.OS +
                    "\n Identification number:" +
                    device.Serial_Number
                  }
                  //need to validate data properties
                  brand={device.Brand}
                  model={device.Model}
                  os={device.OS}
                  location={device.City}
                  custody={device.Vendor}
                  available={device.Available}
                  active={device.Active}
                  sNumber={device.Serial_Number}
                  group={device.Category}
                  subgroup={device.Subcategory}
                  description={device.Description}
                  check_in={device.Release_date}
                  purchaseDate={device.Purchased_on}
                  vendor={device.Vendor}
                  taxRate={device.Tax_rate}
                />
              ))}
            </Grid>
            <Progress />
          </Grid>
        </Grid>
      </div>
    );
  }
  getDevicesFromServer() {
    const request = new Request("/get_device", {
      method: "GET"
    });

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(obj => {
            console.log(obj);

            this.setState({ devices: obj });
            console.log("loaded all devices", this.state);
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

  getDevicesByFilter() {
    let query = createQuery(locationSet, brandSet, availabilitySet);

    const request = new Request("/get_deviceByFilter/" + query, {
      method: "GET"
    });

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(obj => {
            console.log(obj);

            this.setState({ devices: obj });
            console.log("loaded all devices", this.state);
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

function createQuery(locationSet, brandSet, availabilitySet) {
  let locations = Array.from(locationSet);
  let brands = Array.from(brandSet);
  let i = 0;

  let query = "";
  if (locations.length != 0) {
    locations.map(location => {
      if (i == 0) query += 'WHERE (atbl_Office.`City`="' + location + '"';
      else query += ' OR atbl_Office.`City`="' + location + '"';
      i++;
    });
    query += ")";
    if (brands.length != 0) {
      i = 0;
      brands.map(brand => {
        if (i == 0) query += ' AND (atbl_Device.`Brand`="' + brand + '"';
        else query += ' OR atbl_Device.`Brand`="' + brand + '"';
        i++;
      });
      query += ")";
    }
    if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
      query += ' AND atbl_Device.`Available`="1"';
    }
  } else {
    if (brands.length != 0) {
      i = 0;
      brands.map(brand => {
        if (i == 0) query += 'WHERE (atbl_Device.`Brand`="' + brand + '"';
        else query += ' OR atbl_Device.`Brand`="' + brand + '"';
        i++;
      });
      query += ")";
    }
    if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
      query += ' AND atbl_Device.`Available`="1"';
    }
  }
  return query;
}

function handleChecks(value, set, isChecked) {
  if (set.has(value)) {
    isChecked[value] = false;
    set.delete(value);
  } else {
    isChecked[value] = true;
    set.add(value);
  }
  return set;
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  device: Media.propTypes.device
};

export { createQuery, handleChecks };
export default withStyles(styles)(TitlebarGridList);
