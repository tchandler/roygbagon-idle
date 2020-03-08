export const incrementScore = state => {
  return { ...state, score: state.score + 1 };
};

export const updateScore = (state, action) => {
  return { ...state, score: action.newScore };
};

export const updateColors = (state, action) => {
  return { ...state, colors: action.newColors };
};
