import { createActions } from "reduxsauce";

export const { Types, Creators } = createActions(
  {
    incrementScore: null,
    updateScore: ["newScore"],
    updateColor: ["newColor"]
  },
  {}
);
