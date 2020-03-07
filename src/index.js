// import 'regenerator-runtime/runtime'

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'

import createStore from './Redux';
const { store } = createStore();

import App from 'r/Components/App'

let roygbagonElem = document.getElementById("roygbagon");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  roygbagonElem
)