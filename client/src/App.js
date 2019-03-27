import React, { Component } from "react";
import TabMenu from './components/Layout/TabMenu';
import Header from './components/Layout/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TabMenu></TabMenu>
      </div>
    );
  }
}
export default (App);

