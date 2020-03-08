import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "../Redux/Game/actions";

const PurchasePalette = ({
  canAfford,
  buyRed,
  buyGreen,
  buyBlue,
  colorCost
}) => [
  <button onClick={buyRed} disabled={!canAfford} key="buyRed">
    Red ({colorCost})
  </button>,
  <button onClick={buyGreen} disabled={!canAfford} key="buyGreen">
    Green ({colorCost})
  </button>,
  <button onClick={buyBlue} disabled={!canAfford} key="buyBlue">
    Blue ({colorCost})
  </button>
];

const mapStateToProps = ({ game, config }) => ({
  canAfford: game.score >= config.colorCost,
  colorCost: config.colorCost
});

const mapDispatchToProps = {
  buyRed: GameActions.buyRed,
  buyGreen: GameActions.buyGreen,
  buyBlue: GameActions.buyBlue
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePalette);
