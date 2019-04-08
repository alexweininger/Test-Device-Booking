import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactDOM from "react-dom";
import App from "../../App";
import Header from '../Layout/Header';
import tlf from "../Data/image.jpg";
import plusBox from "@material-ui/icons/PhotoCamera";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontSize: 50,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const style = {
    head: {
        margin: 20,
    },
    table: {
        minWidth: 100,
    },
    Paper1: {
        padding: 1,
        marginLeft: 100,
        marginBottom: 1,
        height: 1098,
        

    },
    Paper2: {
        padding: 50,
        marginRight: 0,
        marginBottom: 1,
        height: 1000,
    },

    RigtColumn: {
        padding: 50,
        marginTop: 10,
        marginRight: 0,
        marginBottom: 1,
    },

    containerStyle: {
        background: 'white',
    },

    backarrow: {
        margin: 20,
        fontSize: 20
    },

    buttom: {
        marginBottom: 30,
    }
}

let id = 0;
function createData(name, info) {
    id += 1;
    return { id, name, info };
}

const rows = [
    createData('brand', "Samsung"),
    createData('model', "SM-G930F"),
    createData('Os', "Android 7.0"),
    createData('location', "Wilno"),
    createData('custody', "John Snow"),
    createData('available', "true"),
    createData('actice', "3000-01-01 11:11:11.123"),
    createData('id', 497),
    createData('group', "Tablet Apple"),
    createData('subgroup', "Soup"),
    createData('description', "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"),
    createData('check_in_due', null),
    createData('pruchase_date', "2018-01-01 11:11:11.123"),
    createData('vendor', "Ka randu ta jamu"),
    createData('tax_rate', "Demo Tax: 10.0%"),
];

class DeviceInfo extends React.Component {
    ReturnBack() {
        ReactDOM.render(<App />, document.getElementById("root"));
    }

    constructor() {
        super();
        this.state = {
            Active: "",
            Brand: "",
            Model: "",
            Office: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    state = {};
    render() {
        
        return (

            <form>
                <Header />
                    <Button style={style.backarrow} onClick={this.ReturnBack} >
                                <ArrowBack />
                                Back to the list
                    </Button>
                <Grid container style={style.containerStyle}>
                      
                        <div>
                            <Grid itme>
                                <Paper style={style.Paper1} >
                                    <img alt="Device picture" src={tlf} style={{ height: 400 }} />
                                </Paper>
                            </Grid>
                        </div>

                        <div>
                            <Grid item >
                                <Paper style={style.Paper2}>
                                    <Table style={style.table}>
                                        <TableHead>
                                            <TableRow style={style.head}>
                                                Item information
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow style={style.row} key={row.id}>
                                                    <TableCell componets="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell width="400" align="left">{row.info} </TableCell>
                                                </TableRow>


                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </div>
                        <div style={style.head}>
                        <Button size="large" variant="contained" color="inherit" disabled="ture" fullWidth="ture" style={style.buttom}>
                            BOOK DEVICE
                            <plusBox />
                        </Button>
                        <Button size="large" variant="contained" color="primary" fullWidth="ture" style={style.buttom}>
                            RESERVATION
                        </Button>
                        <Button size="large" variant="contained" color="secondary" fullWidth="ture" style={style.buttom}>
                            CHANGE LOCATION
                        </Button>
                        </div>
                </Grid>
            </form>
        );
    }
}


export default DeviceInfo