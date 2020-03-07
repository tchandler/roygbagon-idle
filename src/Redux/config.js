import { createReducer } from 'reduxsauce'

const DEFAULT_CONFIG = {
  scoreIncrement: 10,
  investmentIncrement: 10,
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
}

export default createReducer(DEFAULT_CONFIG, {})