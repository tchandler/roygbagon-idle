import { takeEvery, all, put, select, fork } from "redux-saga/effects";
import {
  Creators as GameActions,
  Types as GameTypes
} from "../Redux/Game/actions";
import {
  calculateColorHex,
  calculateColorDistance,
  getRGB,
  calculateColorWeight
} from "../Utils/color";
const {
  updateScore,
  updateColors,
  clearColor,
  addShippedColor,
  updateInvestment,
  updateTargetColor
} = GameActions;
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Sagas ------------- */

// import { checkAuth, login, reminder } from './LoginSagas';

const getScore = ({ game }) => game.score;
const getInvestment = ({ game }) => game.investment;
const getInterestRate = ({ game, config }) =>
  game.investment * config.investmentIncrement;

const getConfig = ({ config }) => config;
const getGameState = ({ game }) => game;
const getColors = ({ game }) => ({
  currentColor: game.colors,
  targetColor: game.targetColor
});

function* incrementScore() {
  const score = yield select(getScore);
  const { scoreIncrement } = yield select(getConfig);
  yield put(updateScore(score + scoreIncrement));
}

function* buyInvestment() {
  const { investmentCost } = yield select(getConfig);
  const { score, investment } = yield select(getGameState);
  yield put(updateScore(score - investmentCost));
  yield put(updateInvestment(investment + 1));
}

function* shipColor() {
  const { accuracyMods, colorCost, shipAwardMultiplyer } = yield select(
    getConfig
  );
  const { currentColor, targetColor } = yield select(getColors);
  const currentScore = yield select(getScore);

  const colorDistance = calculateColorDistance(
    getRGB(currentColor),
    getRGB(targetColor)
  );

  const colorErrorPct = colorDistance / 195075;

  const currWeight = calculateColorWeight(currentColor);
  const targetWeight = calculateColorWeight(targetColor);

  const weightError = targetWeight - currWeight;

  const accuracyMod = accuracyMods.reduce((currMod, [max, mod]) => {
    return colorErrorPct <= max ? mod : currMod;
  }, 0);

  const baseAward =
    (targetWeight - Math.abs(weightError)) *
    colorCost *
    shipAwardMultiplyer *
    accuracyMod;

  const shipValue = Math.max(baseAward - colorErrorPct * baseAward, 0);

  // put clear color
  yield put(clearColor());
  yield put(
    updateTargetColor({
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10)
    })
  );

  // put add to score
  yield put(updateScore(currentScore + shipValue));

  // put shipped color details
  const shippedColor = {
    shippedColor: currentColor,
    targetColor,
    shipValue,
    error: colorErrorPct,
    weightDiff: weightError
  };

  yield put(addShippedColor(shippedColor));
}

function* buyRed() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(updateScore(currentScore - colorCost));
    yield put(updateColors({ ...currentColors, red: currentColors.red + 1 }));
  }
}

function* buyGreen() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(updateScore(currentScore - colorCost));
    yield put(
      updateColors({
        ...currentColors,
        green: currentColors.green + 1
      })
    );
  }
}

function* buyBlue() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentColors = yield select(({ game }) => game.colors);
    yield put(updateScore(currentScore - colorCost));
    yield put(
      updateColors({
        ...currentColors,
        blue: currentColors.blue + 1
      })
    );
  }
}
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

function* tickScore(timeDelta) {
  const currentScore = yield select(getScore);
  const interestRate = yield select(getInterestRate);
  const newScore = currentScore + (1 + currentScore * interestRate) * timeDelta;
  yield put(updateScore(newScore));
}

const nextFrame = () =>
  new Promise(resolve => window.requestAnimationFrame(() => resolve()));

function* tickSaga() {
  let lastCall = Date.now();
  let thisCall = Date.now();
  let score = yield select(({ game }) => game.score);
  while (score < 100000) {
    yield nextFrame();
    thisCall = Date.now();
    let diff = thisCall - lastCall;

    score = yield select(({ game }) => game.score);
    yield tickScore(diff / 1000);

    lastCall = thisCall;
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(tickSaga),
    takeEvery(GameTypes.INCREMENT_SCORE, incrementScore),
    takeEvery(GameTypes.BUY_RED, buyRed),
    takeEvery(GameTypes.BUY_GREEN, buyGreen),
    takeEvery(GameTypes.BUY_BLUE, buyBlue),
    takeEvery(GameTypes.SHIP_COLOR, shipColor),
    takeEvery(GameTypes.BUY_INVESTMENT, buyInvestment)
  ]);
}
