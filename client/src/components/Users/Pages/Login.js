import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
        backgroundColor: theme.palette.background.paper,
        width: 450,
    },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
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
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {

        const { classes, theme } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />

                {/* <button type+ */}
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="fullWidth"
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
                                <form className={classes.form}>
                                    <h3>
                                        Enter your details below to create your account:
                                    </h3>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                        <Input id="firstName" name="firstName" autoComplete="firstName" />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                        <Input id="lastName" name="lastName" autoComplete="lastName" />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="slackUsername">Slack Username</InputLabel>
                                        <Input id="slackUsername" name="slackUsername" autoComplete="slackUsername" />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="employID">Employee ID</InputLabel>
                                        <Input id="employID" name="employID" autoComplete="employID" />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="officeID">Office ID</InputLabel>
                                        <Input id="officeID" name="officeID" autoComplete="officeID" />
                                    </FormControl>
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
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
