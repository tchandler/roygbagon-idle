import React from "react";
import { connect } from "react-redux";

const calculateColorHex = (red, green, blue) => {
  const total = red + green + blue;
  const redHex = "0" + Math.floor((red / total) * 255).toString(16);
  const greenHex = "0" + Math.floor((green / total) * 255).toString(16);
  const blueHex = "0" + Math.floor((blue / total) * 255).toString(16);
  return `${redHex.substr(-2)}${greenHex.substr(-2)}${blueHex.substr(-2)}`;
};

export default ({ red, green, blue }) => (
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
        style={{ backgroundColor: `#${calculateColorHex(red, green, blue)}` }}
      ></span>
    </div>
  </div>
);
