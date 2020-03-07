import { takeEvery, all, put, select } from "redux-saga/effects";
import { Types as GameTypes, Creators } from "r/Redux/game";
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Sagas ------------- */

// import { checkAuth, login, reminder } from './LoginSagas';

const getColorCost = ({ config }) => config.colorCost;

function* buyRed() {
  const currentScore = yield select(getScore);
  const colorCost = yield select(getColorCost);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(Creators.updateScore(currentScore - colorCost));
    yield put(
      Creators.updateColor({ ...currentColors, red: currentColors.red + 1 })
    );
  }
}

function* buyGreen() {
  const currentScore = yield select(getScore);
  const colorCost = yield select(getColorCost);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(Creators.updateScore(currentScore - colorCost));
    yield put(
      Creators.updateColor({ ...currentColors, green: currentColors.green + 1 })
    );
  }
}

function* buyBlue() {
  const currentScore = yield select(getScore);
  const colorCost = yield select(getColorCost);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(Creators.updateScore(currentScore - colorCost));
    yield put(
      Creators.updateColor({ ...currentColors, blue: currentColors.blue + 1 })
    );
  }
}
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

const getScore = ({ game }) => game.score;
const getInterestRate = ({ game, config }) =>
  game.investments * config.investmentIncrement;

function* incrementScore(timeDelta) {
  const currentScore = yield select(getScore);
  const interestRate = yield select(getInterestRate);
  const newScore = currentScore + (1 + currentScore * interestRate) * timeDelta;
  yield put(Creators.updateScore(newScore));
}

const nextFrame = () =>
  new Promise(resolve => window.requestAnimationFrame(() => resolve()));

function* tickSaga() {
  let lastCall = Date.now();
  let thisCall = Date.now();
  let score = yield select(({ game }) => game.score);
  while (score < 100) {
    yield nextFrame();
    thisCall = Date.now();
    let diff = thisCall - lastCall;

    score = yield select(({ game }) => game.score);
    yield incrementScore(diff / 1000);

    lastCall = thisCall;
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    tickSaga(),
    takeEvery("BUY_RED", buyRed),
    takeEvery("BUY_GREEN", buyGreen),
    takeEvery("BUY_BLUE", buyBlue)
  ]);
}
