import React from "react";
import { connect } from "react-redux";

const calculateColorWeight = ({ red, green, blue }) => red + green + blue;

const calculateColorHex = ({ red, green, blue }) => {
  const total = calculateColorWeight({
    red,
    green,
    blue
  });
  const redHex = "0" + Math.floor((red / total) * 255).toString(16);
  const greenHex = "0" + Math.floor((green / total) * 255).toString(16);
  const blueHex = "0" + Math.floor((blue / total) * 255).toString(16);
  return `${redHex.substr(-2)}${greenHex.substr(-2)}${blueHex.substr(-2)}`;
};

const ColorCard = ({ red, green, blue, colorHex }) => (
  <div>
    <div>
      <h3>Colors:</h3>
      <ul>
        <li>Red: {red}</li>
        <li>Green: {green}</li>
        <li>Blue: {blue}</li>
      </ul>
    </div>
    <div>
      Current color:
      <span
        className="swatch"
        style={{ backgroundColor: `#${colorHex}` }}
      ></span>
    </div>
  </div>
);

const mapStateToProps = ({ game }) => {
  const { red, green, blue } = game.colors;
  return {
    red,
    green,
    blue,
    colorHex: calculateColorHex(game.colors)
  };
};

export default connect(mapStateToProps)(ColorCard);
