import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Media from "./Media";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import ReactDOM from "react-dom";
import NewDevice from "./NewDevice.js";
import Grid from "@material-ui/core/Grid";
import Checkbox from "./Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Location from "./Location";
import Brands from "./Brands";
import Pagination from "material-ui-flat-pagination";
import TabMenu from "../Layout/TabMenu";
import Header from "../Layout/Header";
import { NavLink } from "react-router-dom";
var i = 0;

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
var storage = require("sessionstorage");

var locationSet = new Set();
var brandSet = new Set();
var availabilitySet = new Set();
var isCheckedLocation = [];
var isCheckedBrand = [];
var isCheckedAvailability = [];
const inputText = { value: "" };
var input = "";

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
      devices: [],
      allDevices: [],
      offset: 0
    };
    this.getUserBookings();
    this.getUserReservation();
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
    if (
      locationSet.size == 0 &&
      brandSet.size == 0 &&
      availabilitySet.size == 0
    ) {
      this.getDevicesFromServer();
    } else this.getDevicesByFilter();
  };
  handleClickPage(offset) {
    this.setState({ offset });
  }

  componentDidMount() {
    this.getDevicesByFilter = this.getDevicesByFilter.bind(this);
    this.handleChange();
    this.interval = setInterval(() => this.search(), 3000);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!" + localStorage.length);
    if (localStorage.length === 0) {
      window.location.href = "http://localhost:3000/Login";
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  search = () => {
    if (input !== inputText.value) {
      console.log(input !== inputText.value);
      input = inputText.value;
      let newDeviceList = this.state.allDevices.filter(device => {
        let brand = device.Brand + " " + device.Model;
        return brand.toLowerCase().indexOf(inputText.value.toLowerCase()) >= 0;
      });
      this.setState({ devices: newDeviceList });
    }
  };

  render() {
    const { classes } = this.props;
    const devices = this.state.devices || [];
    console.log("++++" + localStorage.getItem("userId"));
    return (
      <div>
        <Header />
        <TabMenu />
        <div className={classes.root}>
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="Add"
            style={{ zIndex: 1 }}
          >
            <NavLink to="/NewDevice">
              {" "}
              <AddIcon style={{ color: "white" }} />
            </NavLink>
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
                {devices
                  /*.filter(device =>{
                let brand = device.Brand + " " + device.Model;
                return brand.toLowerCase().indexOf(inputText.value.toLowerCase()) >= 0;
              })*/
                  .map(device => (
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
                      images={device.Image}
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
              {/*<Pagination
              limit={10}
              offset={this.state.offset}
              total={100}
              onClick={(e, offset) => this.handleClickPage(offset)}
            />*/}
            </Grid>
          </Grid>
        </div>
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
          res.json().then(obj => {
            console.log(obj);

            this.setState({ devices: obj, allDevices: obj });
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
  getUserBookings() {
    var id = localStorage.getItem("userId");
    const request = new Request(`/get_userBookings/${id}`, {
      method: "GET"
    });

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(bookings => {
            console.log(bookings);
            if (bookings.length > 0) {
              localStorage.setItem(
                "userBookings",
                bookings[0].fk_device_ser_nr
              );
              localStorage.setItem(
                "userFD",
                bookings[0].FinishDate
              );
              console.log(
                "BBBBBBBBBBBBBBBBBBBBBBBBBB " + bookings[0].FinishDate
              );
              var c = localStorage.getItem("userBookings");
              console.log("CCCCCCCCCCCCCCCCCCCCCCCCCC " + c);
              //  this.setState({ userBookings: bookings });
            }
            //  else localStorage.setItem('userBookings', null);
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
  }
  getUserReservation() {
    var id = localStorage.getItem("userId");
    console.log("IIIIDDDD "+id);
    const request = new Request(
      `/get_userReservations/${id}`,
      {
        method: "GET"
      }
    );

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(reservations => {
            console.log(reservations);
            if(reservations.length > 0){
              localStorage.setItem('userReservation', reservations[0].fk_device_ser_nr);
            console.log("RESERVATION[0] "+reservations[0].fk_device_ser_nr);
            var c = localStorage.getItem('userReservation');
            console.log("RESERVATION "+ c);
          //  this.setState({ userBookings: bookings });
            }
          //  else localStorage.setItem('userBookings', null);
            console.log("loaded all user reservations");
            return reservations;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in get user reservations", err);
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
  } else if (brands.length != 0) {
    i = 0;
    brands.map(brand => {
      if (i == 0) query += 'WHERE (atbl_Device.`Brand`="' + brand + '"';
      else query += ' OR atbl_Device.`Brand`="' + brand + '"';
      i++;
    });
    query += ")";
    if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
      query += ' AND atbl_Device.`Available`="1"';
    }
  } else {
    if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
      query += ' WHERE atbl_Device.`Available`="1"';
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

function handleChecks_test(value, set, isChecked) {
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
  return set;
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  device: Media.propTypes.device
};

export { createQuery, handleChecks_test, inputText };
export default withStyles(styles)(TitlebarGridList);
