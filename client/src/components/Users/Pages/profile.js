import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table'

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

function CustomizedTable(props) {
  const { classes } = props;

  return (
    // <Paper className={classes.root}>
    //   <Table className={classes.table}>
    //     <TableHead>
    //       <TableRow>
    //         <CustomTableCell align="center">First Name</CustomTableCell>
    //         <CustomTableCell align="center">Last Name</CustomTableCell>
    //         <CustomTableCell align="center">Email</CustomTableCell>
    //         <CustomTableCell align="center">Location</CustomTableCell>
    //         <CustomTableCell align="center">Slack Name</CustomTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map(row => (
    //         <TableRow className={classes.row} key={row.id} >
    //           <CustomTableCell align="center">{row.first_name}</CustomTableCell> {/*component="th" scope="row"*/}
    //           <CustomTableCell align="center">{row.last_name}</CustomTableCell>
    //           <CustomTableCell align="center">{row.email}</CustomTableCell>
    //           <CustomTableCell align="center">{row.location}</CustomTableCell>
    //           <CustomTableCell align="center">{row.slack_name}</CustomTableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </Paper>
    <MaterialTable
      columns={[
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Location', field: 'location' },
        { title: 'Slack Name', field: 'slackName' },
      ]}
      data={
        [
          { firstName: 'John', lastName: 'Snow', email: 'knows.nothing@north.got', location: 'Portland, Oregon', slackName: 'LordCommand' },
          { firstName: 'Bronius', lastName: null, email: null, location: null, slackName: null },
        ]}
      title="More Actions"
      actions={[
        {
          icon: 'account_circle',
          tooltip: 'Show User Info',
          onClick: (event, rowData) => {
            alert('You clicked user ' + rowData.name)
          },
        },
        rowData => ({
          icon: 'account_circle',
          tooltip: 'Show User Info',
          disabled: rowData.birthYear >= 2000,
          onClick: (event, rowData) => {
            alert('You clicked user ' + rowData.name)
          },
        }),
        {
          icon: 'account_circle',
          tooltip: 'Show User Info',
          onClick: (event, rowData) => {
            alert('You clicked user ' + rowData.name)
          },
          iconProps: {
            style: {
              fontSize: 30,
              color: 'green',
            },
          },
        },
      ]}
    />
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);