export const incrementScore = state => {
  return { ...state, score: state.score + 1 };
};

export const updateScore = (state, action) => {
  return { ...state, score: action.newScore };
};

export const updateColors = (state, action) => {
  return { ...state, colors: action.newColors };
};

export const clearColor = state => {
  return { ...state, colors: { red: 0, green: 0, blue: 0 } };
};

export const addShippedColor = (state, { shippedColor }) => {
  return { ...state, shipped: [shippedColor, ...state.shipped] };
};
