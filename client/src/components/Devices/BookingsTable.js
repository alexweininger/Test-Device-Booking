import React from "react";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  
  const styles = theme => ({
    table: {
      marginTop: 30,
      minWidth: 500
    },
    row: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  });

class BookingsTable extends React.Component {
    state = {
        open: false,
        selectedTimeValue: 0
      };
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
      handleTimeChange = (event, index, value) =>
        this.setState({ selectedTimeValue: value });
    render() {
        const { classes } = this.props;
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
                    {rows.map(row => (
                    <TableRow className={classes.row} key={row.id}>
                      <CustomTableCell align="left">{row.time}</CustomTableCell>
                      <CustomTableCell align="left">
                        {row.reservedBy}
                      </CustomTableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default withStyles(styles)(BookingsTable);

let id = 0;
function createData(time, reservedBy) {
  id += 1;
  return { id, time, reservedBy };
}

const rows = [
  createData("9:00-11:00", "Name Surname"),
  createData("11:45-13:00", "Name Surname"),
  createData("16:30-17:00", "Name Surname"),
  createData("17:00-17:45", "Name Surname")
];
