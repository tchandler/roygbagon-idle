import { Types } from "./actions";
import {
  updateScore,
  updateStock,
  updateTargetColor,
  updateColors,
  clearColor,
  addShippedColor,
  updateInvestment,
} from "./reducers";
import { createReducer } from "reduxsauce";

const INITIAL_STATE = {
  score: 900,
  investment: 0,
  ticks: 0,
  lastFrame: 0,
  timeDelta: 0,
  maxBatches: 1,
  batches: [],
  stockFillRate: 0.25,
  stock: {
    red: 0,
    green: 0,
    blue: 0,
  },
  colors: {
    red: 2,
    green: 3,
    blue: 6,
  },
  targetColor: {
    red: 2,
    green: 3,
    blue: 6,
  },
  shipped: [],
  items: [],
};

export const handlers = {
  [Types.UPDATE_SCORE]: updateScore,
  [Types.UPDATE_STOCK]: updateStock,
  [Types.UPDATE_COLORS]: updateColors,
  [Types.UPDATE_TARGET_COLOR]: updateTargetColor,
  [Types.CLEAR_COLOR]: clearColor,
  [Types.ADD_SHIPPED_COLOR]: addShippedColor,
  [Types.UPDATE_INVESTMENT]: updateInvestment,
};

export const reducer = createReducer(INITIAL_STATE, handlers);
