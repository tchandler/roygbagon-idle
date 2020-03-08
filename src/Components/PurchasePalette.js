import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "../Redux/Game/actions";

const PurchasePalette = ({ canAfford, buyRed, buyGreen, buyBlue }) => [
  <button onClick={buyRed} disabled={!canAfford} key="buyRed">
    Buy Red
  </button>,
  <button onClick={buyGreen} disabled={!canAfford} key="buyGreen">
    Buy Green
  </button>,
  <button onClick={buyBlue} disabled={!canAfford} key="buyBlue">
    Buy Blue
  </button>
];

const mapStateToProps = ({ game, config }) => ({
  canAfford: game.score >= config.colorCost
});

const mapDispatchToProps = {
  buyRed: GameActions.buyRed,
  buyGreen: GameActions.buyGreen,
  buyBlue: GameActions.buyBlue
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePalette);
