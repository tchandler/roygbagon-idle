import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  incrementScore: null,
  updateScore: ["newScore"],
  updateStock: ["newStock"],
  updateColors: ["newColors"],
  updateTargetColor: ["newTargetColor"],
  buyRed: null,
  buyBlue: null,
  buyGreen: null,
  addColorToBatch: ["color", "batchIndex"],
  shipColor: null,
  clearColor: null,
  addShippedColor: ["shippedColor"],
  buyInvestment: null,
  updateInvestment: ["investment"],
});
