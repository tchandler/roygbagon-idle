import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "r/Redux/Game/actions";
const { addColorToBatch } = GameActions;

import ShipColor from "../Components/ShipColor";
import ColorCard from "r/Components/ColorCard";
const BatchColorCard = ({
  red,
  redAvailable,
  green,
  greenAvailable,
  blue,
  blueAvailable,
  addColorToBatch,
}) => (
  <div className="target-color-card">
    <h3>Current Batch</h3>
    <ColorCard red={red} green={green} blue={blue} detail />
    <button onClick={() => addColorToBatch("red", 0)} disabled={!redAvailable}>
      Add Red
    </button>
    <button
      onClick={() => addColorToBatch("green", 0)}
      disabled={!blueAvailable}
    >
      Add Green
    </button>
    <button
      onClick={() => addColorToBatch("blue", 0)}
      disabled={!greenAvailable}
    >
      Add Blue
    </button>
    <ShipColor />
  </div>
);

const mapStateToProps = ({ game }) => {
  const { red, green, blue } = game.colors;
  const { red: redStock, green: greenStock, blue: blueStock } = game.stock;
  return {
    red,
    redAvailable: redStock >= 1,
    green,
    greenAvailable: greenStock >= 1,
    blue,
    blueAvailable: blueStock >= 1,
  };
};

const mapDispatchToProps = {
  addColorToBatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchColorCard);
