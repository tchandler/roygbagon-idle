import React from "react";
import { connect } from "react-redux";

import "./index.css";

const Ticker = ({ score }) => <div className="score">{score}</div>;

const mapStateToProps = state => ({
  score: state.game.score.toFixed(2)
});

export default connect(mapStateToProps)(Ticker);
