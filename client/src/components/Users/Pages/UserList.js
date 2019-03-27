import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Paragraph from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MaterialTable from 'material-table'

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
		width: "auto",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto",
		marginLeft: "auto",
		marginRight: 'auto'
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

let users = [createData("John", "Snow", "knows.nothing@north.got", "Portland, Oregon", "LordCommander2"), createData("Bronius", null, null, null, null)];


class CustomizedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedUser: null,
			users: users
		};
		this.getUsers();
		this.state.users = this.getUsers(); // later we will get this from the server
	}

	getUsers = () => {
		console.log('getting all users');

		const request = new Request("http://localhost:5000/users", {
			method: "POST"
		});

		fetch(request)
			.then(res => {

				//if we successfully updated the DB
				if (res.ok) {
					//add the office
					res.json().then(obj => {
						console.log(obj);
						this.setState({ users: obj });
						console.log('loaded all users', this.state);
						return obj;
					});
				}
			})
			.catch(err => {
				//if we successfully updated the DB
				console.log('Error in getUsers', err);
				console.log("post failed");
			});
	}

	render() {
		const { classes } = this.props;
		if (this.state.selectedUser) {
			return <ProfileTable user={this.state.selectedUser} returnToList={() => this.setSelectedUser(null)} />;
		} else if (this.state.users) {
			return (
				// <Paper className={classes.root, classes.container}>
				// 	<Table className={classes.table}>
				// 		<TableHead>
				// 			<TableRow>
				// 				<CustomTableCell align="center">First Name</CustomTableCell>
				// 				<CustomTableCell align="center">Last Name</CustomTableCell>
				// 				<CustomTableCell align="center">Email Address</CustomTableCell>
				// 				<CustomTableCell align="center">Slack Username</CustomTableCell>
				// 				<CustomTableCell align="center">Office ID</CustomTableCell>
				// 			</TableRow>
				// 		</TableHead>
				// 		<TableBody>
				// 			{this.state.users.map(user => (
				// 				<TableRow className={classes.row} key={user.id} onClick={() => this.setSelectedUser(user)}>
				// 					<CustomTableCell align="center">{user.firstName}</CustomTableCell> {/*component="th" scope="row"*/}
				// 					<CustomTableCell align="center">{user.lastName}</CustomTableCell>
				// 					<CustomTableCell align="center">{user.email}</CustomTableCell>
				// 					<CustomTableCell align="center">{user.slackUsername}</CustomTableCell>
				// 					<CustomTableCell align="center">{user.officeId}</CustomTableCell>
				// 				</TableRow>
				// 			))}
				// 		</TableBody>
				// 	</Table>
				// </Paper>
				<MaterialTable
					columns={[
						{ title: 'First Name', field: 'firstName' },
						{ title: 'Last Name', field: 'lastName' },
						{ title: 'Email Address', field: 'email' },
						{ title: 'Slack Username', field: 'slackUsername' },
						{ title: 'Office ID', field: 'officeID' },
					]}

					{this.state.users.map(user => (
						data = {
							[
								{ firstName: user.first_name, lastName: user.last_name, emial: user.email, slackUsername: user.slackUsername, officeID: user.officeID },
							]}
					))}



					title="Default Actions"
					options={{
						columnsButton: true,
						exportButton: true,
					}}
				/>
			);
		} else {
			return (
				<h1>Loading...</h1>
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
