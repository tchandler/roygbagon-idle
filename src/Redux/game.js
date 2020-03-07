import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  score: 0
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
