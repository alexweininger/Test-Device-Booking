import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(first_name, last_name, email, location, slack_name) {
  //   id += 1;
  return { first_name, last_name, email, location, slack_name };
}

const rows = [
  createData('John', 'Snow', "knows.nothing@north.got", "Portland, Oregon", "LordCommander2"),
  createData('Bronius', null, null, null, null),
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell align="center">First Name</CustomTableCell>
            <CustomTableCell align="center">Last Name</CustomTableCell>
            <CustomTableCell align="center">Email</CustomTableCell>
            <CustomTableCell align="center">Location</CustomTableCell>
            <CustomTableCell align="center">Slack Name</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id} >
              <CustomTableCell align="center">{row.first_name}</CustomTableCell> {/*component="th" scope="row"*/}
              <CustomTableCell align="center">{row.last_name}</CustomTableCell>
              <CustomTableCell align="center">{row.email}</CustomTableCell>
              <CustomTableCell align="center">{row.location}</CustomTableCell>
              <CustomTableCell align="center">{row.slack_name}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);