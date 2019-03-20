import React from 'react';
import ReactDOM from 'react-dom';

//material UI imports
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

/* create one of three different mocked office datas
 * @param i which office data to return
 */
function createMockUser() {
    return {
        "first_name": "John",
        "last_name": "Snow",
        "email": "knows.nothing@north.got",
        "location": "Portland, Oregon",
        "slack_name": "LordCommander2"
    }
}


/* A high level component that is able to render,
 * -the list of offices
 * -the office details
 */
class EditUser extends React.Component {
    constructor(props) {
        super(props);

        const userInfo = createMockUser();

        this.state = {
            //an array of objects with data about each office
            userInfo: userInfo,

            isAdmin: null,
            isMainUser: null,
        }
    }

    renderCurrentUser() {

        return (
            <form className={"b"} noValidate autoComplete="off">
                {this.renderUserAttribute("First Name", this.state.userInfo.first_name)}
                {this.renderUserAttribute("Last Name", this.state.userInfo.last_name)}
                {this.renderUserAttribute("Email", this.state.userInfo.email)}
                {this.renderUserAttribute("Location", this.state.userInfo.location)}
                {this.renderUserAttribute("Slack Username", this.state.userInfo.slack_name)}
            </form>
        );
    }

    renderUserAttribute(attName, value) {
        return(
            <TextField
                id="user-name"
                label={attName}
                className={"b"}
                value={value}
                margin="normal"
            />
        );
    }

    render() {
        return this.renderCurrentUser();
    }

	/* set the office to display details for
	 * @param office the office object for which the details page
	 *					should be displayed. null if the office list
	 *					should be shown
	 */
    setOfficeToShow(office) {
        const newState = {
            offices: this.state.offices,
            officeToShow: office
        }

        this.setState(newState);
    }
}

// ========================================

export default EditUser;
