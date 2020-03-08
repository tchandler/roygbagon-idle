import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions({
  incrementScore: null,
  updateScore: ["newScore"],
  updateColors: ["newColors"],
  updateTargetColor: ["newTargetColor"],
  buyRed: null,
  buyBlue: null,
  buyGreen: null,
  shipColor: null,
  clearColor: null,
  addShippedColor: ["shippedColor"],
  buyInvestment: null,
  updateInvestment: ["investment"]
});
