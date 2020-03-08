import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    incrementScore: null,
    updateScore: ["newScore"],
    updateColors: ["newColors"],
    buyRed: null,
    buyBlue: null,
    buyGreen: null
  },
  {}
);
