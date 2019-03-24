import React, { Component } from "react";
import TabMenu from './components/Layout/TabMenu';
import Header from './components/Layout/Header';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
         <Header/>
         <TabMenu></TabMenu>
      </div>
    );
  }
}
export default (App);

