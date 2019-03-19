import React, { Component } from "react";
import Reports from './components/Reports';
import TabMenu from './components/TabMenu';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
         <Header/>
         <TabMenu/>
      </div>
    );
  }
}
export default (App);

