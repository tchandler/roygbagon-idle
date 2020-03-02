const elem = document.getElementById('roygbagon')
const startButton = document.getElementById('start')
const moreButton = document.getElementById('more')
const investButton = document.getElementById('invest')
const buyRedButton = document.getElementById('buyRed')
const buyGreenButton = document.getElementById('buyGreen')
const buyBlueButton = document.getElementById('buyBlue')
const shipButton = document.getElementById('shipIt')

const config = {
  scoreIncrement: 10,
  investmentIncrement: 1,
  investmentCost: 100,
  colorCost: 50,
  colorIncrement: 1,
  shipAwardMultiplyer: 1.10
}

const state = {
  score: 0,
  investment: 0,
  ticks: 0,
  lastFrame: 0,
  timeDelta: 0,
  colors: {
    red: 0,
    green: 0,
    blue: 0
  },
  targetColor: {
    red: 2,
    green: 3,
    blue: 6
  }
}

// Helper functions
const getMs = () => Date.now()

const prorate = (value, timeDelta, period) => value * (timeDelta / period)
const prorateSeconds = (value, timeDelta) => prorate(value, timeDelta, 1000)
const prorateInterest = (state) => prorateSeconds(calculateInterest(state), state.timeDelta)
const calculateInterest = (state) => config.scoreIncrement * (state.investment/1000)

const calculateColorHex = ({red, green, blue}) => {
  const total = red + green + blue
  const redHex = '0' + Math.floor((red / total) * 255).toString(16)
  const greenHex = '0' + Math.floor((green / total) * 255).toString(16)
  const blueHex = '0' + Math.floor((blue / total) * 255).toString(16)
  return `${redHex.substr(-2)}${greenHex.substr(-2)}${blueHex.substr(-2)}`
}

const calculateShipValue = (state) => {
  const currColor = parseInt(calculateColorHex(state.colors), 16)
  const targetColor = parseInt(calculateColorHex(state.targetColor), 16)
  const errorPct = Math.abs(currColor - targetColor)/0xFFFFFF
  const baseAward = (state.targetColor.red + state.targetColor.green + state.targetColor.blue) * config.colorCost * config.shipAwardMultiplyer
  return Math.max(baseAward - (errorPct * baseAward), 0)
}

// Main loop
const tick = (state) => {
    const now = getMs()
    state.timeDelta = now - state.lastFrame
    state.lastFrame = now
    update(state)
    render(state)
    window.requestAnimationFrame(() => {
      tick(state)
    })
}

// Time based updates
const update = (state) => {
  state.score += prorateSeconds(config.scoreIncrement + calculateInterest(state), state.timeDelta)
}

// Render updates to interface
const render = (state) => {
  const currentColor = calculateColorHex(state.colors)
  const targetColor = calculateColorHex(state.targetColor)
  elem.innerHTML = `
    <p>Your current score is ${Math.floor(state.score)}</p>
    <p>You've invested ${state.investment} times</p>
    <p>Your investment multiplier is ${(state.investment).toPrecision(2)}% (${calculateInterest(state)} per second)</p>
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
  `
}


// Setup click handlers
const init = (state) => {
  state.lastFrame = getMs()
  moreButton.addEventListener('click', () => {
    state.score += config.scoreIncrement
  })
  investButton.addEventListener('click', () => {
    if (state.score >= config.investmentCost) {
      state.score -= config.investmentCost
      state.investment += config.investmentIncrement
    }
  })
  buyRedButton.addEventListener('click', () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost
      state.colors.red += config.colorIncrement
    }
  })
  buyGreenButton.addEventListener('click', () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost
      state.colors.green += config.colorIncrement
    }
  })
  buyBlueButton.addEventListener('click', () => {
    if (state.score >= config.colorCost) {
      state.score -= config.colorCost
      state.colors.blue += config.colorIncrement
    }
  })
  shipButton.addEventListener('click', () => {
    const shipValue = calculateShipValue(state)
    console.log('earned', shipValue)
    state.score += shipValue
    state.colors = {
      red: 0, green: 0, blue: 0
    }
    state.targetColor = {
      red: Math.floor(Math.random() * 10),
      green: Math.floor(Math.random() * 10),
      blue: Math.floor(Math.random() * 10)
    }
  })
  tick(state)
}

// Start to init
startButton.addEventListener('click', function initOnClick() {
  startButton.removeEventListener('click', initOnClick)
  init(state)
})