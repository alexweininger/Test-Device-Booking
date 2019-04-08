import React, { Component, Fragment } from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import TabMenu from './components/TabMenu'

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />
		<TabMenu/>
        <Footer />
      </Fragment>
    );
  }
}
