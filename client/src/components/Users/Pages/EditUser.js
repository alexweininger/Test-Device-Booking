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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

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
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            location: userInfo.location,
            slack_name: userInfo.slack_name,
            isAdmin: null,
            isMainUser: null,
            isLoggedInUser: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    renderCurrentUser() {
        if(this.state.isAdmin || this.state.isLoggedInUser){
            return (
                <form className={"b"} noValidate autoComplete="off">
                    {this.renderUserAttribute("first_name", "First Name", this.state.userInfo.first_name)}
                    {this.renderUserAttribute("last_name", "Last Name", this.state.userInfo.last_name)}
                    {this.renderUserAttribute("email", "Email", this.state.userInfo.email)}
                    {this.renderUserAttribute("location", "Location", this.state.userInfo.location)}
                    {this.renderUserAttribute("slack_name", "Slack Username", this.state.userInfo.slack_name)}
                </form>
            );
        }else{
            return (
                <span> PLEASE LOG IN </span>
            );
        } 
    }

    renderUserAttribute(attName, label, value) {

        return(
            <TextField
                id="user-name"
                label={label}
                value={this.state[attName]}
                onChange={this.handleChange(attName)}
                margin="normal"
            />
        );
    }

    render() {
        return this.renderCurrentUser();
    }


}

// ========================================

export default EditUser;
