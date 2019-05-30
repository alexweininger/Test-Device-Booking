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

class reservationsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: [],
      Id: ID
    };

    this.getSelectedDayReservations(this.state.Id);
  }

  render() {
    const reservations = this.state.reservations || [];
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
            {reservations.map(b => (
              <TableRow key={b.Number}>
                <CustomTableCell align="left">
                  {b.StartDate.substring(11, 16)}-
                  {b.FinishDate.substring(11, 16)}
                </CustomTableCell>
                <CustomTableCell align="left"> {ID}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  getSelectedDayReservations(ID) {
    const request = new Request("/get_selectedDay", {
      method: "GET",
      //body: JSON.stringify(ID),
      headers: { "Content-Type": "application/json" }
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        console.log("result ", result);
        if (result.success) {
          this.setState({
            reservations: result.reservations
          });
        }
      });
  }
}
export default withStyles(styles)(reservationsTable);
