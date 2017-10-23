import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import { BrowserRouter } from 'react-router-dom';

import { setUserSessionToken } from '../actions/userSession';
import reducers from '../reducers/index';

import Router from './Router';

const initialState = window.__INITIAL_STATE__;
let store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunkMiddleware
  )
);

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
