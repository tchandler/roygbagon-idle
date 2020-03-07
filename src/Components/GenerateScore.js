import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "r/Redux/Game/actions";
const { incrementScore } = GameActions;

const GenerateScore = ({ incrementScore }) => (
  <button id="more" name="more" onClick={incrementScore}>
    Generate Score
  </button>
);

const mapDispatchToProps = {
  incrementScore: incrementScore
};

export default connect(null, mapDispatchToProps)(GenerateScore);
