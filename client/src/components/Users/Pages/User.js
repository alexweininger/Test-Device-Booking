import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Login from './Login';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.secondary.main,
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

const rows = createData('John', 'Snow', 'knows.nothing@north.got', 'Portland, Oregon', 'LordCommander2');

class CustomizedTable extends React.Component{

    constructor(props) {
        super(props);
    }
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell align="left">Profile</CustomTableCell>
                        <CustomTableCell align="left"></CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <CustomTableCell align="left">Name</CustomTableCell> {/*component="th" scope="row"*/}
                        <CustomTableCell align="left">{rows.first_name} {rows.last_name}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell align="left">Email</CustomTableCell> {/*component="th" scope="row"*/}
                        <CustomTableCell align="left">{rows.email}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell align="left">Location</CustomTableCell> {/*component="th" scope="row"*/}
                        <CustomTableCell align="left">{rows.location}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell align="left">Slack Name</CustomTableCell> {/*component="th" scope="row"*/}
                        <CustomTableCell align="left">{rows.slack_name}</CustomTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );

    addUser(user) {
        // var user = {
        //     firstName: ReactDOM.findDOMNode(this.refs.firstName).value,
        //     lastName: ReactDOM.findDOMNode(this.refs.lastName).value,
        //     email: ReactDOM.findDOMNode(this.refs.email).value,
        //     slackUsername: ReactDOM.findDOMNode(this.refs.slackUsername).value,
        //     officeId: ReactDOM.findDOMNode(this.refs.officeID).value,
        //     id: ReactDOM.findDOMNode(this.refs.employID)
        // };

        console.log(user);

        const request = new Request('/newuser', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        fetch(request).then(res => {
			//if we successfully updated the DB
			if(res.ok){
				//add the office

				console.log("added user");
			}
        });
        return true;
    }
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
