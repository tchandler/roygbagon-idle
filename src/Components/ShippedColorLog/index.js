import React from "react";
import { connect } from "react-redux";

import "./index.css";

import ColorCard from "../ColorCard";

const ShippedColorLog = ({ shipped }) =>
  shipped.map((shippedColor, index) => (
    <div key={index} className="shipped-color">
      <div>
        <h3>Shipped Color</h3>
        <ColorCard
          red={shippedColor.shippedColor.red}
          green={shippedColor.shippedColor.green}
          blue={shippedColor.shippedColor.blue}
        />
      </div>
      <div>
        <h3>Ordered Color</h3>
        <ColorCard
          red={shippedColor.targetColor.red}
          green={shippedColor.targetColor.green}
          blue={shippedColor.targetColor.blue}
        />
      </div>
      <div>
        <ul>
          <li>Sold Value:{shippedColor.shipValue}</li>
          <li>Error:{shippedColor.error}</li>
          <li>Weight Diff:{shippedColor.weightDiff}</li>
        </ul>
      </div>
    </div>
  ));

export const mapStateToProps = ({ game }) => ({
  shipped: game.shipped,
});

export default connect(mapStateToProps)(ShippedColorLog);
