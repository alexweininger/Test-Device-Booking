import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ProfileTable from "./User";

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	},
	row: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default
		}
	},
	tableRowHover: {
		"&:hover": {
			backgroundColor: theme.palette.grey[200],
			cursor: "pointer"
		}
	}
});

let id = 0;
function createData(first_name, last_name, email, location, slack_name) {
	//   id += 1;
	return { first_name, last_name, email, location, slack_name };
}

const users = [createData("John", "Snow", "knows.nothing@north.got", "Portland, Oregon", "LordCommander2"), createData("Bronius", null, null, null, null)];

class CustomizedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedUser: null,
			users: users
		};

		this.state.users = null; // later we will get this from the server
	}

	render() {
		const { classes } = this.props;
		if (this.state.selectedUser) {
			return <ProfileTable user={this.state.selectedUser} returnToList={() => this.setSelectedUser(null)} />;
		} else {
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
							{users.map(user => (
								<TableRow className={(classes.row, classes.tableRowHover)} key={user.id} onClick={() => this.setSelectedUser(user)}>
									<CustomTableCell align="center">{user.first_name}</CustomTableCell> {/*component="th" scope="row"*/}
									<CustomTableCell align="center">{user.last_name}</CustomTableCell>
									<CustomTableCell align="center">{user.email}</CustomTableCell>
									<CustomTableCell align="center">{user.location}</CustomTableCell>
									<CustomTableCell align="center">{user.slack_name}</CustomTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
			);
		}
	}

	setSelectedUser = user => {
		console.log("clicked user ", user);
		this.updateState({ selectedUser: user });
	};

	updateState(changes) {
		//copy the state
		var newState = {};

		let key;
		for (key in this.state) {
			newState[key] = this.state[key];
		}

		//make updates
		for (key in changes) {
			newState[key] = changes[key];
		}

		this.setState(newState);
	}
}

CustomizedTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
