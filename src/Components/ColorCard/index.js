import React from "react";
import { connect } from "react-redux";
import "./index.css";

import { calculateColorHex } from "../../Utils/color";

export default ({ red, green, blue }) => (
  <div>
    <ul>
      <li>Red: {red}</li>
      <li>Green: {green}</li>
      <li>Blue: {blue}</li>
      <li>
        <span
          key={red + green + blue}
          className="swatch"
          style={{ backgroundColor: `#${calculateColorHex(red, green, blue)}` }}
        ></span>
      </li>
    </ul>
  </div>
);
