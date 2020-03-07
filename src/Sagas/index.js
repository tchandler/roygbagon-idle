import { takeLatest, all, delay, put, select } from 'redux-saga/effects';
import { Creators } from 'r/Redux/game'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

// import { LoginTypes } from '../Redux/LoginRedux';

/* ------------- Sagas ------------- */

// import { checkAuth, login, reminder } from './LoginSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

const getScore = ({game}) => game.score
const getInterestRate = () => 0.01

function* incrementScore(timeDelta) {
  const currentScore = yield select(getScore)
  const interestRate = yield select(getInterestRate)
  const newScore = currentScore + ((1 + (currentScore * interestRate)) * timeDelta)
  yield put(Creators.updateScore(newScore))
}

const nextFrame = () => new Promise(resolve => window.requestAnimationFrame(() => resolve()))

function* tickSaga () {
  let lastCall = Date.now()
  let thisCall = Date.now()
  let score = yield select(({game}) => game.score)
  while(score < 100) {
    yield nextFrame()
    thisCall = Date.now()
    let diff = thisCall - lastCall
    
    score = yield select(({game}) => game.score)
    yield incrementScore(diff / 1000)
    
    lastCall = thisCall
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    tickSaga()
  ]);
}