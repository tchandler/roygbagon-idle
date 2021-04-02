import React from "react";
import { connect } from "react-redux";
import PurchasePalette from "../PurchasePalette";
import Ticker from "../Ticker";
import "./index.css";

const Inventory = ({ red, green, blue, score }) => (
  <div>
    <ul className="color-inventory">
      <li>
        Score: {Math.floor(score)}
        <progress max={1} value={score - Math.floor(score)}></progress>
      </li>
      <li>
        Red: {Math.floor(red)}{" "}
        <progress max={1} value={red - Math.floor(red)}></progress>
      </li>
      <li>
        Green: {Math.floor(green)}{" "}
        <progress max={1} value={green - Math.floor(green)}></progress>
      </li>
      <li>
        Blue: {Math.floor(blue)}{" "}
        <progress max={1} value={blue - Math.floor(blue)}></progress>
      </li>
    </ul>
    <PurchasePalette />
  </div>
);

const mapStateToProps = ({ game }) => {
  const { red, green, blue } = game.stock;
  return {
    red,
    green,
    blue,
    score: game.score.toFixed(2),
  };
};

export default connect(mapStateToProps)(Inventory);
