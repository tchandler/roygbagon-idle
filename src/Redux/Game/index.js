import { Types } from "./actions";
import {
  updateScore,
  updateTargetColor,
  updateColors,
  clearColor,
  addShippedColor,
  updateInvestment
} from "./reducers";
import { createReducer } from "reduxsauce";

const INITIAL_STATE = {
  score: 900,
  investment: 0,
  ticks: 0,
  lastFrame: 0,
  timeDelta: 0,
  colors: {
    red: 2,
    green: 3,
    blue: 6
  },
  targetColor: {
    red: 2,
    green: 3,
    blue: 6
  },
  shipped: []
};

export const handlers = {
  [Types.UPDATE_SCORE]: updateScore,
  [Types.UPDATE_COLORS]: updateColors,
  [Types.UPDATE_TARGET_COLOR]: updateTargetColor,
  [Types.CLEAR_COLOR]: clearColor,
  [Types.ADD_SHIPPED_COLOR]: addShippedColor,
  [Types.UPDATE_INVESTMENT]: updateInvestment
};

export const reducer = createReducer(INITIAL_STATE, handlers);
