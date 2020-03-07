import React from "react";
import { connect } from "react-redux";

import CurrentColorCard from "./CurrentColorCard";
import TargetColorCard from "./TargetColorCard";
import GenerateScore from "r/Components/GenerateScore";

const MainView = ({ incrementScore }) => {
  return (
    <div className="playArea">
      <div className="buttons">
        <button id="start" name="start">
          Start
        </button>
        <GenerateScore />
        <button id="invest" name="invest">
          Invest
        </button>
        <button id="buyRed" name="buyRed">
          Buy Red
        </button>
        <button id="buyGreen" name="buyGreen">
          Buy Green
        </button>
        <button id="buyBlue" name="buyBlue">
          Buy Blue
        </button>
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
