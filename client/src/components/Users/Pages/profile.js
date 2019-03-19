import React from 'react';
import './profile.css';

import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function mockUserInfo() {
    return {
        first_name : "John",
        last_name : "Snow",
        email : "knows.nothing@north.got",
        location : "the wall",
        slack_name : "LordCommander2"
    };
}

function UserItem(mock) {
    return (
        <TableRow className="UserData" onClick= {() => mock.onClick()}>
            <TableCell className= "userInfo"> {mock.first_name} </TableCell>
            <TableCell className= "userInfo"> {mock.last_name} </TableCell>
            <TableCell className= "userInfo"> {mock.email} </TableCell>
            <TableCell className= "userInfo"> {mock.location} </TableCell>
            <TableCell className= "userInfo"> {mock.slack_name} </TableCell>
        </TableRow>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);

        const users = mockUserInfo();

        this.state= {
            users : user,

            userShown : null,
        }
    }

    renderUser(user);

    
}