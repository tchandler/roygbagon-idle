import React from "react";
import { connect } from "react-redux";

import ColorCard from "r/Components/ColorCard";

const TargetColorCard = ({ red, green, blue, detail }) => (
  <div className="target-color-card">
    <h3>Target Color</h3>
    <ColorCard red={red} green={green} blue={blue} detail={detail} />
  </div>
);

const mapStateToProps = ({ game }) => {
  const { red, green, blue } = game.targetColor;
  return {
    red,
    green,
    blue,
  };
};

export default connect(mapStateToProps)(TargetColorCard);
