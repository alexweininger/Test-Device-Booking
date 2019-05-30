import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Login from "./Login";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBack";
import MaterialTable from "material-table";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

let id = 0;
function createData(FirstName, LastName, Email, OfficeId, SlackUsername) {
  //   id += 1;
  return { FirstName, LastName, Email, OfficeId, SlackUsername };
}

const user = createData(
  "John",
  "Snow",
  "knows.nothing@north.got",
  "1",
  "LordCommander2"
);

let users = [];

class ProfileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      users: users,
      loggedInUser: "Niraj" //later we will turn this into being an object from the db
    };
    this.setUser = (index, user) => {
      this.state.users[index] = user;
    };
  }

  setSelectedUser(user) {
    const newState = {
      selectedUser: user
    };
    this.setState(newState);
  }

  editUsers = (index, newData) => {
    console.log("editing users ");

    const request = new Request("http://localhost:5000/users", {
      method: "POST"
    });

    fetch(request)
      .then(res => {
        //if we successfully updated the DB
        if (res.ok) {
          //add the office
          res.json().then(obj => {
            this.setUser(index, newData);
            console.log("updated edited user", this.state.users[index]);
            return obj;
          });
        }
      })
      .catch(err => {
        //if we successfully updated the DB
        console.log("Error in editUsers", err);
        console.log("post failed");
      });
  };

  render() {
    const { classes, props } = this.props;
    console.log(this.props.user.firstName);
    if (
      this.state.loggedInUser == "admin" ||
      this.state.loggedInUser == this.props.user.firstName
    ) {
      return (
        <Paper className={classes.root}>
          <Button onClick={() => this.props.returnToList()}>
            <ArrowBack />
            Back to the list
          </Button>
          <MaterialTable
            columns={[
              { title: "First Name", field: "FirstName" },
              { title: "Last Name", field: "LastName" },
              { title: "Email Address", field: "Email" },
              { title: "Slack Username", field: "SlackUsername" },
              { title: "Office ID", field: "OfficeId" }
            ]}
            data={[this.props.user]}
            title="User Profile"
            options={{
              toolbar: false,
              paging: false
            }}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      //TODO Add push to database
                      const data = this.state.users;
                      data.push(newData);
                      this.setState({ data }, () => resolve());

                      const request = new Request("/new_user", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" }
                      });
                    }
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      //TODO push changes to database
                      const data = this.state.users;
                      const index = data.indexOf(oldData);
                      data[index] = newData;
                      this.setState({ data }, () => resolve());
                      this.editUsers(index, newData);
                    }
                    resolve();
                  }, 1000);
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    {
                      //Push changes to DB
                      let data = this.state.users;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve());
                    }
                    resolve();
                  }, 1000);
                })
            }}
          />
        </Paper>
      );
    }
    if (this.state.loggedInUser == "employee") {
      return (
        <Paper className={classes.root}>
          <Button onClick={() => this.props.returnToList()}>
            <ArrowBack />
            Back to the list
          </Button>
          <MaterialTable
            columns={[
              { title: "First Name", field: "FirstName" },
              { title: "Last Name", field: "LastName" },
              { title: "Email Address", field: "Email" },
              { title: "Slack Username", field: "SlackUsername" },
              { title: "Office ID", field: "OfficeId" }
            ]}
            data={[this.props.user]}
            title="User Profile"
            options={{
              toolbar: false,
              paging: false
            }}
          />
        </Paper>
      );
    } else {
      return <span> PLEASE LOG IN </span>;
    }
  }
}

ProfileTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileTable);
