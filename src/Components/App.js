import React from "react";
import { connect } from "react-redux";
import MainView from "r/Containers/Main";
import Inventory from "./Inventory";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Inventory />
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect()(App);
