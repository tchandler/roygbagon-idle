import React from "react";
import Ticker from "./Ticker";
import { connect } from "react-redux";
import MainView from "r/Containers/Main";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Ticker />
          <MainView />
        </div>
      </div>
    );
  }
}

export default connect()(App);
