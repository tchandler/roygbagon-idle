import React from "react";
import { connect } from "react-redux";

import CurrentColorCard from "./CurrentColorCard";
import TargetColorCard from "./TargetColorCard";
import GenerateScore from "../Components/GenerateScore";
import PurchasePalette from "../Components/PurchasePalette";
import ShipColor from "../Components/ShipColor";
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
        <ShipColor />
      </div>
      <CurrentColorCard />
      <TargetColorCard />
    </div>
  );
};

export default connect()(MainView);
