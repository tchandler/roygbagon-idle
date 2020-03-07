import React from "react";
import { connect } from "react-redux";

import ColorCard from "r/Components/ColorCard";

const mapStateToProps = ({ game }) => {
  const { red, green, blue } = game.targetColor;
  return {
    red,
    green,
    blue
  };
};

export default connect(mapStateToProps)(ColorCard);
