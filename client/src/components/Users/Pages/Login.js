import './Login.css';
import * as request from 'request';
import NewDevice from "../../../App.js";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Header from '../../Layout/Header'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import AppBar from "./AppBar";

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
}



const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary,
    },
    main: {
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    tab: {
        width: 400,
    },
    paper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
    },
    submit: {
        marginTop: theme.spacing.unit * 2,
    },
});


class FullWidthTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            lastName: "",
            firstName: ""
        };
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleInputChange2 = (event) => {
        this.firstName = event.target.value;
    }


    render() {

        const { classes, theme } = this.props;
        console.log("locS: " + localStorage.getItem('userId'));
        return (
            <main className={classes.main}>
                <div>
                    <Header />
                    <AppBar/>
                </div>
                <div className={classes.root}>
                <TabContainer dir={theme.direction}>
                            <Paper className={classes.paper}>
                                <form className={classes.form} >
                                    <h1>
                                        Welcome back!
                                     </h1>
                                    <h5 style={{ color: '#989898' }}>
                                        Enter your details below to access your account:
                                    </h5>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email-login">Email</InputLabel>
                                        <Input id="email-login" name="email-login" autoComplete="email-login" value={this.state.name} onChange={e => this.setState({ firstName: e.target.value })} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password-login">Password</InputLabel>
                                        <Input name="password-login" type="password" id="password-login" autoComplete="current-password" value={this.state.name} onChange={e => this.setState({ lastName: e.target.value })} />
                                    </FormControl>
                                    <Button
                                        type=""
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={() => {this.loginUser(this.state)}}
                                    >
                                        <NavLink 
                                            style={{color: 'white', textDecoration: 'none'}} 
                                            to="/">Log in
                                        </NavLink>
                                    </Button>
                                </form>
                            </Paper>
                        </TabContainer>
                </div>
            </main >
        );
    }

    loginUser(user) {
        let query = 'where Device_Booking.atbl_Users.Email = lsimmank0@admin.ch';
        const request = new Request('/get_LoginUser' ,{
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        // Create a list to return.
        let rtrnList = {};

        fetch(request).then(res => res.json()).then(result => {
            //if success then update the office list
            if (result.success) {

                const officeList = result.offices;
                let office,i;
                for (i in officeList)
                {
                    office = officeList[i];          
                    if(office.Email === this.state.firstName && office.Password === this.state.lastName)
                    {
                        localStorage.setItem('userId', office.id);
                        ReactDOM.render(<NewDevice />, document.getElementById("root"));
                        console.log("hi");
                        break;
                    }
                }
            }
            else {
                console.log("Error");
            }
        }).catch(err => {
            console.log(err);
        });
    }
}


FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
