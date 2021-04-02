export const updateScore = (state, { newScore }) => {
  return { ...state, score: newScore };
};

export const updateStock = (state, action) => {
  return { ...state, stock: action.newStock };
};

export const updateColors = (state, action) => {
  return { ...state, colors: action.newColors };
};

export const updateTargetColor = (state, { newTargetColor }) => {
  return { ...state, targetColor: newTargetColor };
};

export const clearColor = (state) => {
  return { ...state, colors: { red: 0, green: 0, blue: 0 } };
};

export const addShippedColor = (state, { shippedColor }) => {
  return { ...state, shipped: [shippedColor, ...state.shipped] };
};

export const updateInvestment = (state, { investment }) => {
  return { ...state, investment };
};
