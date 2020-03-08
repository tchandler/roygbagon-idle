import React from "react";
import { connect } from "react-redux";

import CurrentColorCard from "./CurrentColorCard";
import TargetColorCard from "./TargetColorCard";
import GenerateScore from "../Components/GenerateScore";
import PurchasePalette from "../Components/PurchasePalette";
import ShipColor from "../Components/ShipColor";
import ShippedColorLog from "../Components/ShippedColorLog";
import Invest from "../Components/Invest";
import "./Main.css";

const MainView = () => {
  return (
    <div className="playArea">
      <div className="buttons">
        <GenerateScore />
        <Invest />
        <PurchasePalette />
        <ShipColor />
      </div>
      <CurrentColorCard />
      <TargetColorCard />
      <ShippedColorLog />
    </div>
  );
};

export default connect()(MainView);
