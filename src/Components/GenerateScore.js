import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "../Redux/Game/actions";
const { incrementScore } = GameActions;

const GenerateScore = ({ incrementScore, scoreIncrement }) => (
  <button onClick={incrementScore}>+{scoreIncrement}</button>
);

const mapStateToProps = ({ config }) => ({
  scoreIncrement: config.scoreIncrement
});

const mapDispatchToProps = {
  incrementScore: incrementScore
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateScore);
