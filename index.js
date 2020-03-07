const elem = document.getElementById("roygbagon");
const startButton = document.getElementById("start");
const moreButton = document.getElementById("more");
const investButton = document.getElementById("invest");
const buyRedButton = document.getElementById("buyRed");
const buyGreenButton = document.getElementById("buyGreen");
const buyBlueButton = document.getElementById("buyBlue");
const shipButton = document.getElementById("shipIt");
const dumpButton = document.getElementById("dumpIt");

const config = {
  scoreIncrement: 10,
  investmentIncrement: 0.001,
  investmentCost: 1000,
  colorCost: 50,
  colorIncrement: 1,
  shipAwardMultiplyer: 1.1,
  dumpMultiplyer: 1.1,
  accuracyMods: [
    [1, 0.25],
    [0.5, 0.5],
    [0.25, 0.8],
    [0.1, 1],
    [0.05, 1.5],
    [0.01, 1.75]
  ]
};

const state = {
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

// Helper functions
const getMs = () => Date.now();
const getRGB = color => [color >> 16, (color >> 8) & 0xff, color & 0xff];
const prorate = (value, timeDelta, period) => value * (timeDelta / period);
const prorateSeconds = (value, timeDelta) => prorate(value, timeDelta, 1000);
const prorateInterest = state =>
  prorateSeconds(calculateInterest(state), state.timeDelta);
const calculateInterest = state =>
  config.scoreIncrement *
  ((state.investments * config.investmentIncrement) / 1000);

const calculateColorHex = ({ red, green, blue }) => {
  const total = calculateColorWeight({
    red,
    green,
    blue
  });
  const redHex = "0" + Math.floor((red / total) * 255).toString(16);
  const greenHex = "0" + Math.floor((green / total) * 255).toString(16);
  const blueHex = "0" + Math.floor((blue / total) * 255).toString(16);
  return `${redHex.substr(-2)}${greenHex.substr(-2)}${blueHex.substr(-2)}`;
};

const calculateColorWeight = ({ red, green, blue }) => red + green + blue;
const calculateColorDistance = ([x1, y1, z1], [x2, y2, z2]) =>
  (
    Math.pow((x2 - x1), 2) + 
    Math.pow((y2 - y1), 2) + 
    Math.pow((z2 - z1), 2)
  ) ^ (1 / 2);

const calculateShipValue = state => {
  const currColorHex = calculateColorHex(state.colors);
  const currColor = parseInt(currColorHex, 16);
  const targetColorHex = calculateColorHex(state.targetColor);
  const targetColor = parseInt(targetColorHex, 16);

  const colorDistance = calculateColorDistance(
    getRGB(currColor),
    getRGB(targetColor)
  );

  const colorErrorPct = colorDistance / 195075;
  
  console.log(`Color Distance: ${colorDistance}`, `Color Error: ${colorErrorPct}`)

  const currWeight = calculateColorWeight(state.colors);
  const targetWeight = calculateColorWeight(state.targetColor);

  const weightError = targetWeight - currWeight;

  const accuracyMod = config.accuracyMods.reduce((currMod, [max, mod]) => {
    return colorErrorPct <= max ? mod : currMod;
  }, 0);

  const baseAward =
    (targetWeight - Math.abs(weightError)) *
    config.colorCost *
    config.shipAwardMultiplyer *
    accuracyMod;
  return [
    Math.max(baseAward - colorErrorPct * baseAward, 0),
    colorErrorPct,
    weightError
  ];
};

// Main loop
const tick = state => {
  const now = getMs();
  state.timeDelta = now - state.lastFrame;
  state.lastFrame = now;
  update(state);
  render(state);
  window.requestAnimationFrame(() => {
    tick(state);
  });
};

// Time based updates
const update = state => {
  state.score += prorateSeconds(
    config.scoreIncrement + calculateInterest(state),
    state.timeDelta
  );
};

// Render updates to interface
const render = state => {
  const currentColor = calculateColorHex(state.colors);
  const targetColor = calculateColorHex(state.targetColor);
  elem.innerHTML = `
    <p>Your current score is ${Math.floor(state.score)}</p>
    <p>You've invested ${state.investments} times</p>
    <p>Your investment multiplier is ${state.investments.toPrecision(
      2
    )}% (${calculateInterest(state)} per second)</p>
    <p>
      <h3>Colors:</h3>
      <ul>
        <li>Red: ${state.colors.red}</li>
        <li>Green: ${state.colors.green}</li>
        <li>Blue: ${state.colors.blue}</li>
      </ul>
    </p>
    <p>Current color: <span class="swatch" style="background-color: #${currentColor};"></span></p>
    <p>
      <h3>Target Color:</h3>
      <span class="swatch" style="background-color: #${targetColor};"></span>
    </p>
    <p>
      <h3>Shipped: </h3>
      <ul>
        ${renderShipped(state)}
      </ul>
    </p>
  `;
};

const renderShipped = state =>
  state.shipped
    .map(
      ({ shippedColor, targetColor, shipValue, error, weightDiff }) => `<li>
    Shipped Color: <span class="swatch" style="background-color: #${calculateColorHex(
      shippedColor
    )};"></span><br />
    Target Color: <span class="swatch" style="background-color: #${calculateColorHex(
      targetColor
    )};"></span><br />
    Earned: ${shipValue}<br />
    Error: ${(error * 100).toPrecision(2)}%<br />
    Weight diff: ${weightDiff}
  </li>`
    )
    .join("");

// Setup click handlers
const init = state => {
  state.lastFrame = getMs();
  moreButton.addEventListener("click", () => {
    state.score += config.scoreIncrement;
  });
  investButton.addEventListener("click", () => {
    if (state.score >= config.investmentCost) {
      state.score -= config.investmentCost;
      state.investments += 1;
    }
  });
  buyRedButton.addEventListener("click", () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost;
      state.colors.red += config.colorIncrement;
    }
  });
  buyGreenButton.addEventListener("click", () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost;
      state.colors.green += config.colorIncrement;
    }
  });
  buyBlueButton.addEventListener("click", () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost;
      state.colors.blue += config.colorIncrement;
    }
  });
  shipButton.addEventListener("click", () => {
    const [shipValue, errorPct, weightError] = calculateShipValue(state);
    if (shipValue > 0) {
      state.score += shipValue;
      state.shipped.unshift({
        shippedColor: state.colors,
        targetColor: state.targetColor,
        shipValue: shipValue,
        error: errorPct,
        weightDiff: weightError
      });
      state.colors = {
        red: 0,
        green: 0,
        blue: 0
      };
      state.targetColor = {
        red: Math.floor(Math.random() * 10),
        green: Math.floor(Math.random() * 10),
        blue: Math.floor(Math.random() * 10)
      };
    }
  });
  dumpButton.addEventListener("click", () => {
    const currWeight = calculateColorWeight(state.colors);
    const dumpCost = currWeight * config.dumpMultiplyer;
    if (state.score >= dumpCost) {
      state.score -= dumpCost;
      state.colors = {
        red: 0,
        green: 0,
        blue: 0
      };
    }
  });

  tick(state);
};

// Start to init
startButton.addEventListener("click", function initOnClick() {
  startButton.removeEventListener("click", initOnClick);
  init(state);
});
