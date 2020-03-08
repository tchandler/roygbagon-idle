import { Types } from "./actions";
import {
  incrementScore,
  updateScore,
  updateColors,
  clearColor,
  addShippedColor
} from "./reducers";
import { createReducer } from "reduxsauce";

const INITIAL_STATE = {
  score: 400,
  investments: 0,
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
  [Types.INCREMENT_SCORE]: incrementScore,
  [Types.UPDATE_SCORE]: updateScore,
  [Types.UPDATE_COLORS]: updateColors,
  [Types.CLEAR_COLOR]: clearColor,
  [Types.ADD_SHIPPED_COLOR]: addShippedColor
};

export const reducer = createReducer(INITIAL_STATE, handlers);
