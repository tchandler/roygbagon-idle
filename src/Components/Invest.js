import React from "react";
import { connect } from "react-redux";

import { Creators as GameActions } from "../Redux/Game/actions";
const { buyInvestment } = GameActions;

const Invest = ({ buyInvestment, canAfford, investmentCost }) => (
  <button onClick={buyInvestment} disabled={!canAfford}>
    Invest ({investmentCost})
  </button>
);

const mapStateToProps = ({ game, config }) => ({
  canAfford: game.score >= config.investmentCost,
  investmentCost: config.investmentCost
});

const mapDispatchToProps = { buyInvestment };

export default connect(mapStateToProps, mapDispatchToProps)(Invest);
