import { createActions, createReducer } from 'reduxsauce'

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
}

export const { Types, Creators } = createActions({
  incrementScore: null,
  updateScore: ['newScore']
}, {})

const incrementScore = (state) => {
  return ({...state, score: state.score + 1})
}

const updateScore = (state, action) => {
  return ({...state, score: action.newScore})
}

const handlers = {
  [Types.INCREMENT_SCORE]: incrementScore,
  [Types.UPDATE_SCORE]: updateScore
}

export default createReducer(INITIAL_STATE, handlers)
