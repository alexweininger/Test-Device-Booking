import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ReactDOM from "react-dom";
import App from "../../App";
import Header from "../Layout/Header";
import tlf from "../Data/image.jpg";
import plusBox from "@material-ui/icons/PhotoCamera";
import PropTypes from "prop-types";
import BookingsTable from "./BookingsTable";
import { NavLink } from "react-router-dom";

const style = {
  head: {
    margin: 20
  },
  table: {
    minWidth: 100
  },
  Paper1: {
    padding: 1,
    marginLeft: 100,
    marginBottom: 1,
    height: 1098
  },
  Paper2: {
    padding: 50,
    marginRight: 0,
    marginBottom: 1,
    height: 1000
  },

  RigtColumn: {
    padding: 50,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 1
  },

  containerStyle: {
    background: "white"
  },

  backarrow: {
    margin: 20,
    fontSize: 20
  },

  buttom: {
    marginBottom: 30
  }
};

class DeviceInfo extends React.Component {
  ReturnBack() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      devices: [{}]
    };
  }

  componentDidMount() {
    this.getDevicesFromServer();
  }

  render() {
    const {
      Brand,
      Model,
      OS,
      City,
      Vendor,
      Available,
      Active,
      Image,
      Serial_Number,
      Category,
      Subcategory,
      Description,
      Release_date,
      Purchased_on,
      Tax_rate
    } = this.state.devices[0];
    var availableValue, activeValue;
    //it checks or device is available
    if (Available == 1) {
      availableValue = "true";
    } else {
      availableValue = "false";
    }
    //it checks or device is active
    if (Active == 0) {
      activeValue = "false";
    } else {
      activeValue = "true";
    }

    return (
      <form>
        <NavLink to="/" style={style.backarrow}>
          <ArrowBack />
          Back to the list
        </NavLink>
        <Grid container style={style.containerStyle}>
          <div>
            <Grid itme>
              <Paper style={style.Paper1}>
                <img alt="Device picture" src={Image} />
              </Paper>
            </Grid>
          </div>

          <div>
            <Grid item>
              <Paper style={style.Paper2}>
                <Table style={style.table}>
                  <TableHead>
                    <TableRow style={style.head}>Item information</TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={style.row} key={1}>
                      <TableCell componets="th" scope="row">
                        {"Brand"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Brand}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={2}>
                      <TableCell componets="th" scope="row">
                        {"Model"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Model}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={3}>
                      <TableCell componets="th" scope="row">
                        {"Os"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {OS}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={4}>
                      <TableCell componets="th" scope="row">
                        {"Location"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {City}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={5}>
                      <TableCell componets="th" scope="row">
                        {"Custody"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Vendor}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={6}>
                      <TableCell componets="th" scope="row">
                        {"Available"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {availableValue}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={7}>
                      <TableCell componets="th" scope="row">
                        {"Active"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {activeValue}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={8}>
                      <TableCell componets="th" scope="row">
                        {"Serial_Number"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Serial_Number}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={9}>
                      <TableCell componets="th" scope="row">
                        {"group"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Category}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={10}>
                      <TableCell componets="th" scope="row">
                        {"subgroup"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Subcategory}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={11}>
                      <TableCell componets="th" scope="row">
                        {"Description"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Description}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={12}>
                      <TableCell componets="th" scope="row">
                        {"check_in_due"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Release_date}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow style={style.row} key={13}>
                      <TableCell componets="th" scope="row">
                        {"purchase_date"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Purchased_on}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow style={style.row} key={14}>
                      <TableCell componets="th" scope="row">
                        {"vendor"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Vendor}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={15}>
                      <TableCell componets="th" scope="row">
                        {"tax_rate"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {Tax_rate}{" "}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </div>
          <div style={style.head}>
            <Button
              size="large"
              variant="contained"
              color="inherit"
              disabled="ture"
              fullWidth="ture"
              style={style.buttom}
            >
              BOOK DEVICE
              <plusBox />
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              fullWidth="ture"
              style={style.buttom}
            >
              RESERVATION
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              fullWidth="ture"
              style={style.buttom}
            >
              CHANGE LOCATION
            </Button>
            <BookingsTable ID={Serial_Number} />
          </div>
        </Grid>
      </form>
    );
  }

  getDevicesFromServer() {
    const request = new Request(
      "/get_device/" + this.props.match.params.sNumber,
      {
        method: "GET"
      }
    );

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
}

DeviceInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  brand: PropTypes.string.isRequired,
  device: PropTypes.shape({})
};
export default withStyles(style)(DeviceInfo);
