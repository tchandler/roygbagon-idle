import React from "react";
import { connect } from "react-redux";

import "./index.css";

const Ticker = ({ score }) => (
  <div className="score">
    {Math.floor(score)}
    <progress max={1} value={score - Math.floor(score)}></progress>
  </div>
);

const mapStateToProps = ({ game }) => ({
  score: game.score.toFixed(2)
});

export default connect(mapStateToProps)(Ticker);
