import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Reports from "./components/Devices/Reports"
import Grid from "./components/Devices/Grid";
import Office from "./components/Offices/Office";
import profile from "./components/Users/Pages/UserList";
import DeviceInfo from "./components/Devices/DeviceInfo";
import Login from "./components/Users/Pages/Login";
import NewDevice from "./components/Devices/NewDevice";
import SignUp from "./components/Users/Pages/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Grid} />
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/NewDevice" component={NewDevice} />
            <Route path="/Offices/" component={Office}/> 
            <Route path="/UserList/" component={profile} />
            <Route path="/:sNumber/" component={DeviceInfo} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
