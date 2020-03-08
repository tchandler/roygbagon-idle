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
const { updateScore, updateColors, clearColor, addShippedColor } = GameActions;
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Sagas ------------- */

// import { checkAuth, login, reminder } from './LoginSagas';

const getScore = ({ game }) => game.score;
const getInterestRate = ({ game, config }) =>
  game.investments * config.investmentIncrement;

const getConfig = ({ config }) => config;
const getColors = ({ game }) => ({
  currentColor: game.colors,
  targetColor: game.targetColor
});

function* shipColor() {
  console.log("shipping color");
  const { accuracyMods, colorCost, shipAwardMultiplyer } = yield select(
    getConfig
  );
  const { currentColor, targetColor } = yield select(getColors);
  const currentScore = yield select(getScore);
  const currentColorHex = calculateColorHex(currentColor);
  const targetColorHex = calculateColorHex(targetColor);

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

function* incrementScore(timeDelta) {
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
    yield incrementScore(diff / 1000);

    lastCall = thisCall;
  }
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(tickSaga),
    takeEvery(GameTypes.BUY_RED, buyRed),
    takeEvery(GameTypes.BUY_GREEN, buyGreen),
    takeEvery(GameTypes.BUY_BLUE, buyBlue),
    takeEvery(GameTypes.SHIP_COLOR, shipColor)
  ]);
}
