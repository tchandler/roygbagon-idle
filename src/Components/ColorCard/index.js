import React from "react";
import { connect } from "react-redux";
import "./index.css";

import { calculateColorHex } from "../../Utils/color";

const renderDetails = (red, green, blue, detail) => {
  return detail ? (
    <ul className="details">
      <li>Red: {red}</li>
      <li>Green: {green}</li>
      <li>Blue: {blue}</li>
      <li></li>
    </ul>
  ) : (
    <ul className="details">
      <li>Weight: {red + green + blue}</li>
    </ul>
  );
};

export default ({ red, green, blue, detail = false }) => (
  <div>
    <span
      key={red + green + blue}
      className="swatch"
      style={{ backgroundColor: `#${calculateColorHex(red, green, blue)}` }}
    ></span>
    {renderDetails(red, green, blue, detail)}
  </div>
);
