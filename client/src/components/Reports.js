import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/InsertDriveFile';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import Header from './Header';
import TabMenu from './TabMenu';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(title, date) {
  id += 1;
  return { id, title, date};
}

const rows = [
  createData('A Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('A Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('Another Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('Another Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('A Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('A Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('Another Unique Report Title Goes Here', '17.11.2017 11:30'),
  createData('A Unique Report Title Goes Here', '17.11.2017 11:30')
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
      <div>
      <Paper styles={{margin: 'leftMargin'}} className={classes.root}>
      
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell width="200" align="left">REPORT TITLE</CustomTableCell>
            <CustomTableCell width="100" align="left">DATE CREATED</CustomTableCell>
            <CustomTableCell width="50"align="left">ACTIONS</CustomTableCell>
            <CustomTableCell width="50"align="left"></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.title}
              </CustomTableCell>
              <CustomTableCell style={{color: "grey"}} align="left">{row.date}</CustomTableCell>
              <CustomTableCell >
                  <PreviewIcon color="primary" className={classes.button}/>
                  <Button style={{textDecoration: "underline", color: "grey"}}>Preview</Button>
              </CustomTableCell>
              <CustomTableCell>
                  <DownloadIcon color="primary" className={classes.button}/>
                  <Button style={{textDecoration: "underline", color: "grey"}}>Download</Button>
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </div>
    
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);