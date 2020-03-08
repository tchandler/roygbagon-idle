import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "r/Redux/Game/actions";
const { shipColor } = GameActions;

const ShipColor = ({ shipColor }) => (
  <button onClick={shipColor}>Ship It!</button>
);

const mapDispatchToProps = {
  shipColor
};

export default connect(null, mapDispatchToProps)(ShipColor);
