import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const date = new Date();
const time = timeArray(date);
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
  dialog: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 80
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 10,
    width: 70
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
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

class BookDevice extends React.Component {
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
        <Button
          size="large"
          variant="contained"
          color="inherit"
          className={classes.button}
          onClick={this.handleClickOpen}
        >
          Book device
        </Button>
        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Book device"}
            <DialogContent className={classes.dialog}>
              <InputLabel className={classes.input}>
                From {(date.getHours()<10?'0':'')+date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()}
              </InputLabel>
              <InputLabel className={classes.input}>To</InputLabel>
              <Select
                className={classes.input}
                color="inherit"
                value={this.state.selectedTimeValue}
                onChange={this.handleTimeChange}
              >
                {time.map((t, index) => (
                  <MenuItem
                    key={index}
                    selected={index === "Pyxis"}
                    onClick={this.handleClose}
                  >
                    {(t.getHours()<10?'0':'')+t.getHours()+":"+(t.getMinutes()<10?'0':'')+t.getMinutes()}
                  </MenuItem>
                ))}
              </Select>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="inherit">
                OK
              </Button>
              <Button onClick={this.handleClose} color="inherit" autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </DialogTitle>
        </Dialog>
      </div>
    );
  }
}

function timeArray(date) {
  var h = date.getHours();
  var min = date.getMinutes();
  var time = [];

  min = Math.ceil(min /15) * 15;
  if (min >= 60) {
    min = 15;
    h++;
  }
  while (h < 24) {
    if (min >= 60) {
      min = 0;
      h++;
    }
    var date = new Date();
    date.setHours(h);
    date.setMinutes(min);
    time.push(date);
    min += 15;    
  }
  return time;
}
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

export default withStyles(styles)(BookDevice);
