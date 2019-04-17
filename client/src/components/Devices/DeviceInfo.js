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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 50
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

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

let id = 0;
function createData(name, info) {
  id += 1;
  return { id, name, info };
}
/*
const rows2 = [
  createData("brand", "Samsung"),
  createData("model", "SM-G930F"),
  createData("Os", "Android 7.0"),
  createData("location", "Wilno"),
  createData("custody", "John Snow"),
  createData("available", "true"),
  createData("actice", "3000-01-01 11:11:11.123"),
  createData("id", 497),
  createData("group", "Tablet Apple"),
  createData("subgroup", "Soup"),
  createData(
    "description",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
  ),
  createData("check_in_due", null),
  createData("pruchase_date", "2018-01-01 11:11:11.123"),
  createData("vendor", "Ka randu ta jamu"),
  createData("tax_rate", "Demo Tax: 10.0%")
];
*/
class DeviceInfo extends React.Component {
  ReturnBack() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  state = {
    value: ""
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  state = {};
  render() {
    const {
      classes1,
      brand,
      model,
      os,
      location,
      custody,
      available,
      active,
      sNumber,
      group,
      subgroup,
      description,
      check_in,
      purchaseDate,
      vendor,
      taxRate
    } = this.props;
    var availableValue, activeValue;
    //it checks or device is available
    if (available == 1) {
      availableValue = "true";
    } else {
      availableValue = "false";
    }
    //it checks or device is active
    if (active == 0) {
      activeValue = "false";
    } else {
      activeValue = "true";
    }

    /*const rows = [
      ("1", "Brand", brand),
      ("2", "Model", model),
      ("3", "Os", os),
      ("4", "location", location),
      ("5", "Custody", custody),
      ("6", "Available", t),
      ("7", "Active", f),
      ("8", "Serial_Number", sNumber),
      ("9", "group", group),
      ("10", "subgroup", subgroup),
      ("11", "Description", description),
      ("12", "check_in_due", check_in),
      ("13", "pruchase_date", purchaseDate),
      ("14", "vendor", vendor),
      ("15", "tax_rate", taxRate)
    ];
*/
    return (
      <form>
        <Header />
        <Button style={style.backarrow} onClick={this.ReturnBack}>
          <ArrowBack />
          Back to the list
        </Button>
        <Grid container style={style.containerStyle}>
          <div>
            <Grid itme>
              <Paper style={style.Paper1}>
                <img alt="Device picture" src={tlf} style={{ height: 400 }} />
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
                        {brand}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={2}>
                      <TableCell componets="th" scope="row">
                        {"Model"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {model}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={3}>
                      <TableCell componets="th" scope="row">
                        {"Os"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {os}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={4}>
                      <TableCell componets="th" scope="row">
                        {"Location"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {location}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={5}>
                      <TableCell componets="th" scope="row">
                        {"Custody"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {custody}{" "}
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
                        {sNumber}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={9}>
                      <TableCell componets="th" scope="row">
                        {"group"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {group}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={10}>
                      <TableCell componets="th" scope="row">
                        {"subgroup"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {subgroup}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={11}>
                      <TableCell componets="th" scope="row">
                        {"Description"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {description}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={12}>
                      <TableCell componets="th" scope="row">
                        {"check_in_due"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {check_in}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow style={style.row} key={13}>
                      <TableCell componets="th" scope="row">
                        {"purchase_date"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {purchaseDate}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow style={style.row} key={14}>
                      <TableCell componets="th" scope="row">
                        {"vendor"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {vendor}{" "}
                      </TableCell>
                    </TableRow>

                    <TableRow style={style.row} key={15}>
                      <TableCell componets="th" scope="row">
                        {"tax_rate"}
                      </TableCell>
                      <TableCell width="400" align="left">
                        {taxRate}{" "}
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
          </div>
        </Grid>
      </form>
    );
  }
}

DeviceInfo.propTypes = {
  classes: PropTypes.object.isRequired
};
export default DeviceInfo;
