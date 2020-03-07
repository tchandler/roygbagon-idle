import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = {
  score: 0
}

export const { Types, Creators } = createActions({
  incrementScore: null,
}, {})

const incrementScore = (state) => {
  return ({...state, score: state.score + 1})
}

const handlers = {
  [Types.INCREMENT_SCORE]: incrementScore
}

export default createReducer(INITIAL_STATE, handlers)
