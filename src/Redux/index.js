import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import { reducer as gameReducer } from "./Game";
import { reducer as configReducer } from "./config";
import rootSaga from "r/Sagas/";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  game: gameReducer,
  config: configReducer
});

export default () => {
  let finalReducers = reducers;

  let { history, store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require("../Sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return {
    history,
    store
  };
};
