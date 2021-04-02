import { takeEvery, all, put, select, fork } from "redux-saga/effects";
import {
  Creators as GameActions,
  Types as GameTypes,
} from "../Redux/Game/actions";
import {
  calculateColorHex,
  calculateColorDistance,
  colorToRGB,
  calculateColorWeight,
} from "../Utils/color";
const {
  updateScore,
  updateStock,
  updateColors,
  clearColor,
  addShippedColor,
  updateInvestment,
  updateTargetColor,
} = GameActions;
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Sagas ------------- */

// import { checkAuth, login, reminder } from './LoginSagas';

const getScore = ({ game }) => game.score;
const getStock = ({ game }) => game.stock;
const getInvestment = ({ game }) => game.investment;
const getInterestRate = ({ game, config }) =>
  game.investment * config.investmentIncrement;

const getConfig = ({ config }) => config;
const getGameState = ({ game }) => game;
const getColors = ({ game }) => ({
  currentColor: game.colors,
  targetColor: game.targetColor,
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
    colorToRGB(currentColor),
    colorToRGB(targetColor)
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

  const shipValue = Math.round(
    Math.max(baseAward - colorErrorPct * baseAward, 0)
  );

  // put clear color
  yield put(clearColor());
  yield put(
    updateTargetColor({
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10),
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
    weightDiff: weightError,
  };

  yield put(addShippedColor(shippedColor));
}

function* buyRed() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentStock = yield select(({ game }) => game.stock);
    yield put(updateScore(currentScore - colorCost));
    yield put(updateStock({ ...currentStock, red: currentStock.red + 1 }));
  }
}

function* buyGreen() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentStock = yield select(({ game }) => game.stock);
    yield put(updateScore(currentScore - colorCost));
    yield put(
      updateStock({
        ...currentStock,
        green: currentStock.green + 1,
      })
    );
  }
}

function* buyBlue() {
  const currentScore = yield select(getScore);
  const { colorCost } = yield select(getConfig);

  if (currentScore >= colorCost) {
    const currentStock = yield select(({ game }) => game.stock);
    yield put(updateScore(currentScore - colorCost));
    yield put(
      updateStock({
        ...currentStock,
        blue: currentStock.blue + 1,
      })
    );
  }
}

function* addColorToBatch({ color, batchId }) {
  const { currentColor: batch } = yield select(getColors); // reference batches instead of global color
  const stock = yield select(getStock);
  yield put(
    updateStock({
      ...stock,
      [color]: stock[color] - 1,
    })
  );
  yield put(
    updateColors({
      ...batch,
      [color]: batch[color] + 1,
    })
  );
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

function* tickStock(timeDelta) {
  const currentStock = yield select(getStock);
  const fillRate = yield select(({ game }) => game.stockFillRate);
  const fillAmount = fillRate * timeDelta;
  const newStock = {
    red: currentStock.red + fillAmount,
    green: currentStock.green + fillAmount,
    blue: currentStock.blue + fillAmount,
  };
  yield put(updateStock(newStock));
}

const nextFrame = () =>
  new Promise((resolve) => window.requestAnimationFrame(() => resolve()));

function* tickSaga() {
  let lastCall = Date.now();
  let thisCall = Date.now();
  let score = yield select(getScore);
  // TODO: Win conditional?
  while (score < 100000) {
    yield nextFrame();
    thisCall = Date.now();
    let diffMs = thisCall - lastCall;
    let diffS = diffMs / 1000;

    score = yield select(getScore);
    yield tickScore(diffS);
    yield tickStock(diffS);

    lastCall = thisCall;
  }
  // TODO: Win update
  yield put(updateScore(1000));
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    fork(tickSaga),
    takeEvery(GameTypes.INCREMENT_SCORE, incrementScore),
    takeEvery(GameTypes.BUY_RED, buyRed),
    takeEvery(GameTypes.BUY_GREEN, buyGreen),
    takeEvery(GameTypes.BUY_BLUE, buyBlue),
    takeEvery(GameTypes.ADD_COLOR_TO_BATCH, addColorToBatch),
    takeEvery(GameTypes.SHIP_COLOR, shipColor),
    takeEvery(GameTypes.BUY_INVESTMENT, buyInvestment),
  ]);
}
