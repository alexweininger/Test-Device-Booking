import React from 'react';
import './profile.css';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';

function mockUserInfo() {
    switch(pos) {
        case 1:
            return {
                first_name: "John",
                last_name: "Snow",
                email: "knows.nothing@north.got",
                location: "the wall",
                slack_name: "LordCommander2"
            };
        case 2:
            return {
                first_name: "Bronius",
                last_name: null,
                email: null,
                location: null,
                slack_name: null
            };
    }
}

function UserItem(mock) {
    return (
        <TableRow className="UserData" onClick= {() => mock.onClick()}>
            <TableCell className= "userInfo"> {mock.user.first_name} </TableCell>
            <TableCell className= "userInfo"> {mock.user.last_name} </TableCell>
            <TableCell className= "userInfo"> {mock.user.email} </TableCell>
            <TableCell className= "userInfo"> {mock.user.location} </TableCell>
            <TableCell className= "userInfo"> {mock.user.slack_name} </TableCell>
        </TableRow>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);

        const users = [mockUserInfo(1), mockUserInfo(2)];

        this.state= {
            users : users,

            userShown : null,
        }
    }

    renderUser(user, pos) {
        return (
            <UserData user= {user} 
            key = {pos}
            onClick={() => this.showUser(user)}/>
        );
    }

    renderUserList() {
        let index = 0;
        return (
            <div>
                <Table>
                    <TableBody>
                        {this.state.users.map(user => this.renderUser(user, index))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    render() {
        if(!this.state.userShown) {
            return this.renderUserList();
        }
        return null;
    }

    displayUser(user) {
        const newState= {
            users: this.state.users,
            userShown: user
        }

        this.setState(newState);
    }
}

export default Profile;