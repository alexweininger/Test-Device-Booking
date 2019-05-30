import React from "react";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ID } from "./BookDevice";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  table: {
    marginTop: 30,
    minWidth: 400
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class BookingsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      userId: localStorage.getItem("userId"),
      sNumber: this.props.ID
    };

    this.getTodaysBookings(this.state.sNumber);
  }

  render() {
    const bookings = this.state.bookings || [];
    const { classes, ID } = this.props;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Time</CustomTableCell>
              <CustomTableCell align="left">Reserved by</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.Number}>
                <CustomTableCell align="left">
                  {b.StartDate.substring(11, 16)}-
                  {b.FinishDate.substring(11, 16)}
                </CustomTableCell>
                <CustomTableCell align="left"> 
                  {b.FirstName} {b.LastName}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  getTodaysBookings() {
    const request = new Request(`/get_dayBookings/${this.state.sNumber}`, {
      method: "GET"
    });

    fetch(request)
      .then(res => {
        if (res.ok) {
          //add the office
          res.json().then(obj => {
            console.log(obj);

            this.setState({ bookings: obj });
            console.log("loaded all bookings");
            return obj;
          });
        }
        return [];
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in getDevices", err);
        console.log("get failed");
      });
  }
}
export default withStyles(styles)(BookingsTable);
