import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Office from './Offices/Pages/Office';
import Devices from './Devices/Devices';
import EditUser from './Users/Pages/EditUser';
import Login from './Users/Pages/Login';
import Profile from './Users/Pages/profile';
import User from './Users/Pages/User';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class MyTabs extends React.Component {
	state = {
		value: 0,
	};


	handleChange = (event, value) => {
		this.setState({ value });
	};


	render() {
		const { value } = this.state;
		return (
			
			<div>
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Device Booking" />
						<Tab label="Offices" />
						<Tab label="Reports" />
						<Tab label="Login" />
						<Tab label="Profile" />
						<Tab label="User"/>
						<Tab label="EditUser"/>
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><Devices /></TabContainer>}
				{value === 1 && <TabContainer><Office /></TabContainer>}
				{value === 2 && <TabContainer>Item Three</TabContainer>}
				{value === 3 && <TabContainer><Login /></TabContainer>}
				{value === 4 && <TabContainer><Profile /></TabContainer>}
				{value === 5 && <TabContainer><User /></TabContainer>}
				{value === 6 && <TabContainer><EditUser/></TabContainer>}
			</div>
		);
	}
}

MyTabs.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default (MyTabs);
