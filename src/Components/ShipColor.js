import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "r/Redux/Game/actions";
const { shipColor } = GameActions;

const ShipColor = ({ shipColor, canShip }) => (
  <button onClick={shipColor} disabled={!canShip}>
    Ship It!
  </button>
);

const mapStateToProps = ({ game, config }) => {
  const { red, green, blue } = game.colors;
  const canShip = red + green + blue >= 1;
  return { canShip };
};

const mapDispatchToProps = {
  shipColor
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipColor);
