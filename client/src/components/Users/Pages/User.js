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
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MaterialTable from 'material-table'

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

const user = createData('John', 'Snow', 'knows.nothing@north.got', 'Portland, Oregon', 'LordCommander2');

class ProfileTable extends React.Component {

    constructor(props) {
        super(props);
    }

    setSelectedUser(user) {
        const newState = {
            selectedUser: user
        }
        this.setState(newState);
    }

    render() {
        const { classes, props } = this.props;
        return (
            <Paper className={classes.root}>
                <Button onClick={() => this.props.returnToList()}>
                    <ArrowBack />
                    Back to the list
				</Button>
                {/* <Table className={classes.table}> */}
                {/* <TableHead> */}
                {/* <TableRow> */}
                {/* <CustomTableCell align="left">Profile</CustomTableCell> */}
                {/* <CustomTableCell align="left"></CustomTableCell> */}
                {/* </TableRow> */}
                {/* </TableHead> */}
                {/* <TableBody> */}
                {/* <TableRow>
                            <CustomTableCell align="left">Name</CustomTableCell> {/*component="th" scope="row"*/}
                {/* <CustomTableCell align="left">{this.props.user.firstName} {this.props.user.lastName}</CustomTableCell>
                        </TableRow>
                        <TableRow>
                            <CustomTableCell align="left">Email</CustomTableCell> {/*component="th" scope="row"*/}
                {/* <CustomTableCell align="left">{this.props.user.email}</CustomTableCell>
                        </TableRow> */}
                {/* <TableRow> */}
                {/* <CustomTableCell align="left">Slack Name</CustomTableCell> component="th" scope="row" */}
                {/* <CustomTableCell align="left">{this.props.user.slackUsername}</CustomTableCell> */}
                {/* </TableRow> */}
                {/* <TableRow> */}
                {/* <CustomTableCell align="left">Location</CustomTableCell> component="th" scope="row" */}
                {/* <CustomTableCell align="left">{this.props.user.officeId}</CustomTableCell> */}
                {/* </TableRow> */}
                {/* </TableBody> */}
                {/* </Table> */}
                <MaterialTable
                    columns={[
                        { title: 'First Name', field: 'firstName' },
                        { title: 'Last Name', field: 'lastName' },
                        { title: 'Email Address', field: 'email' },
                        { title: 'Slack Username', field: 'slackUsername' },
                        { title: 'Office ID', field: 'officeId' },
                    ]}
                    data={[this.props.user]}

                    title="User Profile"
                    options={{
                        toolbar: false,
                        paging: false,
                    }}
                />
            </Paper>
        )
    };
}

ProfileTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTable);
