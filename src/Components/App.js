import React from "react";
import Ticker from "./Ticker";
import { connect } from "react-redux";
import { Creators } from "../Redux/game";
import CurrentColorCard from "r/Containers/CurrentColorCard";
import TargetColorCard from "r/Containers/TargetColorCard";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Hello</h1>
          <Ticker />
          <button onClick={this.props.incrementScore} name="incr">
            Incr
          </button>
          <CurrentColorCard />
          <TargetColorCard />
        </div>
      </div>
    );
  }
}

export default connect(null, { incrementScore: Creators.incrementScore })(App);
