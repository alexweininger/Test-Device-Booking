import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './Login.css';
import Header from '../../Layout/Header'
import ReactDOM from 'react-dom';
import * as request from 'request';

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


    render() {

        const { classes, theme } = this.props;

        return (
            <main className={classes.main}>
                <div>
                    <Header />
                </div>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="fullWidth"
                            style={{ width: 450, marginLeft: 'auto', marginRight: 'auto' }}
                        >
                            <Tab label={<span style={{ fontSize: 18 }}><strong>LOGIN</strong></span>} />
                            <Tab label={<span style={{ fontSize: 18 }}><strong>SIGN UP</strong></span>} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}>
                            <Paper className={classes.paper}>
                                <form className={classes.form}>
                                    <h1>
                                        Welcome back!
                                     </h1>
                                    <h5 style={{ color: '#989898' }}>
                                        Enter your details below to access your account:
                                    </h5>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username" name="username" autoComplete="username" />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input name="password" type="password" id="password" autoComplete="current-password" />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={() => this.loginUser(this.state)}
                                    >
                                        Log In
                                    </Button>
                                    <p>
                                        Forgot password? <a href='url'>Click here</a> to reset.
                                    </p>
                                </form>
                            </Paper>
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            <Paper className={classes.paper}>
                                <form className={classes.form} onSubmit={this.createAccountHandler} >
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
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" name="email" autoComplete="email" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="slackUsername">Slack Username</InputLabel>
                                        <Input id="slackUsername" name="slackUsername" autoComplete="slackUsername" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="employID">Employee ID</InputLabel>
                                        <Input id="employID" name="employID" autoComplete="employID" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="officeID">Office ID</InputLabel>
                                        <Input id="officeID" name="officeID" autoComplete="officeID" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username" name="username" autoComplete="username" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
                                    </FormControl>
                                    <Button
                                        type=""
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={() => this.addUser(this.state)}
                                    >
                                        Create Account
                                    </Button>
                                </form>
                            </Paper>
                        </TabContainer>
                    </SwipeableViews>
                </div>
            </main >
        );
    }

    loginUser(user) {

        console.log(user);

        const request = new Request(`http://localhost:5000/login?password=*******&username=nirajmali@aol.com`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: 'fuckyou', password: '*********'})
        });

        fetch(request).then(res => {
            //if we successfully updated the DB
            if (res.ok) {
                //add the office

                console.log("logged in");
            }
        }).catch(err => {
            //if we successfully updated the DB
            console.log(err);
            console.log('post failed');
        });
        return true;
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
