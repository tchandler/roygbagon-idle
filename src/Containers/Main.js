import React from "react";
import { connect } from "react-redux";

import CurrentColorCard from "./CurrentColorCard";
import TargetColorCard from "./TargetColorCard";
import GenerateScore from "../Components/GenerateScore";
import PurchasePalette from "../Components/PurchasePalette";
import "./Main.css";
const MainView = ({ incrementScore }) => {
  return (
    <div className="playArea">
      <div className="buttons">
        <GenerateScore />
        <button id="invest" name="invest">
          Invest
        </button>
        <PurchasePalette />
        <button id="shipIt" name="shipIt">
          Ship It!
        </button>
        <button id="dumpIt" name="dumpIt">
          Dump It!
        </button>
      </div>
      <CurrentColorCard />
      <TargetColorCard />
    </div>
  );
};

export default connect()(MainView);
