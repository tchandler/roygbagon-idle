import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

const wrapDispatch = store => {
  const oldDispatch = store.dispatch;
  store.dispatch = action => {
    console.log("dispatching: ", action);
    return oldDispatch(action);
  };
};

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const createAppropriateStore = createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  // wrapDispatch(store);

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga);

  return {
    history,
    store,
    sagasManager,
    sagaMiddleware
  };
};
