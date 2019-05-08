import { Link, Route, BrowserRouter as Router } from "react-router-dom";

import Avatar from "react-avatar";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import Paragraph from "react";
import ProfileTable from "./User";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

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
		marginRight: "auto"
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
	},
	hover: {
		"&:hover": {
			cursor: "pointer"
		}
	}
});

let id = 0;
function createData(first_name, last_name, email, location, slack_name) {
	//   id += 1;
	return { first_name, last_name, email, location, slack_name };
}

let users = [];

class CustomizedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedUser: null,
			users: users,
			loggedInUser: 'admin' //later we will turn this into being an object from the db
		};
		this.setUser = (index, user) => {
			this.state.users[index] = user;
		}
		if (this.state.loggedInUser == 'admin' || this.state.loggedInUser == 'employee') {
			this.state.users = this.getUsers(); // later we will get this from the server
		}
	}
	getUsers = () => {
		console.log("getting all users");

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
						obj.forEach(user => {
							user.fullName = user.FirstName + " " + user.LastName;
						});
						this.setState({ users: obj });
						console.log("loaded all users", this.state);
						return obj;
					});
				}
			})
			.catch(err => {
				//if we successfully updated the DB
				console.log("Error in getUsers", err);
				console.log("post failed");
			});
	};


	editUsers = (index, newData) => {
		console.log("editing users ");

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log('request response text: ', this.response);
			}
		});
		console.log(this.state.users[index]);
		xhr.open("POST", "http://localhost:5000/edit_user");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.setRequestHeader('mode', 'no-cors');
		xhr.setRequestHeader('credentials', 'omit');
		xhr.setRequestHeader('redirecnt', 'follow');
		xhr.getResponseHeader('Set-Cookie');
		xhr.send(JSON.stringify({user: this.state.users[index]}));
	};

	deleteUsers = (index, newData) => {
		console.log("editing users ");

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {
				console.log('request response text: ', this.response);
			}
		});
		console.log(this.state.users[index]);
		xhr.open("POST", "http://localhost:5000/delete_user");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.setRequestHeader('mode', 'no-cors');
		xhr.setRequestHeader('credentials', 'omit');
		xhr.setRequestHeader('redirecnt', 'follow');
		xhr.getResponseHeader('Set-Cookie');
		xhr.send(JSON.stringify({id: this.state.users[index].id}));
	};

	render() {
		const { classes } = this.props;
		if (this.state.selectedUser) {
			return <ProfileTable user={this.state.selectedUser} returnToList={() => this.setSelectedUser(null)} />;
		} else if (this.state.users) {
			if (this.state.loggedInUser == 'admin') {
				return (
					<MaterialTable
						columns={[
							{
								title: "Profile",
								field: "fullName",
								render: rowData => {
									return (
										<Avatar
											className={classes.hover}
											name={rowData.firstName + " " + rowData.lastName}
											round={true}
											size={35}
											textSizeRatio={2}
											onClick={() => {
												this.setSelectedUser(rowData);
											}}
										/>
									);
								}
							},
							{ title: "First Name", field: "firstName" },
							{ title: "Last Name", field: "lastName" },
							{ title: "Email Address", field: "email" },
							{ title: "Slack Username", field: "slackUsername" },
							{ title: "Office ID", field: "officeId" }
						]}
						data={this.state.users}
						title="User List"
						options={{
							columnsButton: true,
							exportButton: true
						}}
						editable={{
							onRowAdd: newData =>
								new Promise((resolve, reject) => {
									setTimeout(() => {
										{
											//TODO Add push to database
											const data = this.state.users;
											data.push(newData);
											this.setState({ data }, () => resolve());

											const request = new Request('/new_user', {
												method: 'POST',
												body: JSON.stringify(data),
												headers: { "Content-Type": "application/json" }
											});

										}
										resolve()
									}, 1000)
								}),
							onRowUpdate: (newData, oldData) =>
								new Promise((resolve, reject) => {

									setTimeout(() => {
										{
											//TODO push changes to database
											const data = this.state.users;
											const index = data.indexOf(oldData);
											data[index] = newData;
											this.setState({ data }, () => resolve());
											this.editUsers(index, newData);
											console.log("tittie fuck");
											// send post request to edit_user with newData


											// var xhr = new XMLHttpRequest();
											// xhr.withCredentials = true;

											// xhr.addEventListener("readystatechange", function () {
											// 	if (this.readyState === 4) {
											// 		console.log('request response text: ', this.response);
											// 	}
											// });

											// xhr.open("POST", "http://localhost:5000/edit_user");
											// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
											// xhr.setRequestHeader("cache-control", "no-cache");
											// xhr.setRequestHeader('mode', 'no-cors');
											// xhr.setRequestHeader('credentials', 'omit');
											// xhr.setRequestHeader('redirecnt', 'follow');
											// xhr.getResponseHeader('Set-Cookie');
											// xhr.send(newData);
										}
										resolve()
									}, 1000)
								}),
							onRowDelete: oldData =>
								new Promise((resolve, reject) => {
									setTimeout(() => {
										{
											//Push changes to DB
											let data = this.state.users;
											const index = data.indexOf(oldData);
											data.splice(index, 1);
											this.setState({ data }, () => resolve());
											this.deleteUsers(index, oldData);
										}
										resolve()
									}, 1000)
								}),
						}}
					/>
				);
			} else if (this.state.loggedInUser == 'employee') {
				return (
					<MaterialTable
						columns={[
							{
								title: "Profile",
								field: "fullName",
								render: rowData => {
									return (
										<Avatar
											className={classes.hover}
											name={rowData.firstName + " " + rowData.lastName}
											round={true}
											size={35}
											textSizeRatio={2}
											onClick={() => {
												this.setSelectedUser(rowData);
											}}
										/>
									);
								}
							},
							{ title: "First Name", field: "firstName" },
							{ title: "Last Name", field: "lastName" },
							{ title: "Email Address", field: "email" },
							{ title: "Slack Username", field: "slackUsername" },
							{ title: "Office ID", field: "officeId" }
						]}
						data={this.state.users}
						title="User List"
						options={{
							columnsButton: true,
						}}
					/>
				);
			} else { //when user is not logged in
				return (
					<span> PLEASE LOG IN </span>
				);
			}

		} else {
			return <h1>Loading...</h1>;
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
