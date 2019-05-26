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

        return (
            <main className={classes.main}>
                <div>
                    <Header />
                    <AppBar/>
                </div>
                <div className={classes.root}>
                <TabContainer dir={theme.direction}>
                            <Paper className={classes.paper}>
                                <form className={classes.form} onSubmit={this.createAccountHandler}  >
                                    <h3>
                                        Enter your details below to create your account:
                                    </h3>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                        <Input id="firstName" name="firstName" autoComplete="firstName" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                        <Input value={this.state.lastName} id="lastName" name="lastName" autoComplete="lastName" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email-signup">Email</InputLabel>
                                        <Input id="email-signup" name="email-signup" autoComplete="email-signup" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="slackUsername">Slack Username</InputLabel>
                                        <Input id="slackUsername" name="slackUsername" autoComplete="slackUsername" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="employeeId">Employee ID</InputLabel>
                                        <Input id="employeeId" name="employeeId" autoComplete="employeeId" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="officeId">Office ID</InputLabel>
                                        <Input id="officeId" name="officeId" autoComplete="officeId" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password-signup">Password</InputLabel>
                                        <Input name="password-signup" type="password" id="password-signup" autoComplete="current-password" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <Button
                                        type=""
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={() => this.addUser(this.state)}
                                    >
                                        <NavLink to="/Login" style={{color: "white", textDecoration: "none"}}>Create Account</NavLink>
                                    </Button>
                                </form>
                            </Paper>
                        </TabContainer>
                </div>
            </main >
        );
    }

    addUser(user) {

        console.log(user);

        const request = new Request('http://localhost:5000/new_user', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        fetch(request).then(res => {
            //if we successfully updated the DB
            if (res.ok) {
                //add the office

                console.log("added user");
            }
        }).catch(err => {
            //if we successfully updated the DB
            console.log(err);
            console.log('post failed');

        });
        return true;
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);