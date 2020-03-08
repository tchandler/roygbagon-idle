import React from "react";
import { connect } from "react-redux";

import ColorCard from "./ColorCard";

const ShippedColorLog = ({ shipped }) =>
  shipped.map((shippedColor, index) => (
    <div key={index}>
      <ColorCard
        red={shippedColor.shippedColor.red}
        green={shippedColor.shippedColor.green}
        blue={shippedColor.shippedColor.blue}
      />
      <ColorCard
        red={shippedColor.targetColor.red}
        green={shippedColor.targetColor.green}
        blue={shippedColor.targetColor.blue}
      />
    </div>
  ));

export const mapStateToProps = ({ game }) => ({
  shipped: game.shipped
});

export default connect(mapStateToProps)(ShippedColorLog);
