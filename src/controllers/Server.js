import express from 'express';
import React from 'react';
import path from 'path';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import ReactRouter from '../components/Router';
import app from './App';
import { application } from '../../config';

import reducers from '../reducers/index';
import { setUserSessionToken } from '../actions/userSession';

console.log(`Application enviroment is ${process.env.NODE_ENV}`);

app.set('views', path.resolve('src/view'));
app.set('view engine', 'ejs');

// SETINGS FOR STATIC FILES
app.use('/public', express.static(path.resolve('public')));

// HANDLE ALL OTHERS REQUESTS
app.get('*', (req, res) => {
  const context = {};
  let status = 200;
  const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware),
  );

  if (req.cookies.sigeva_user_token) {
    store.dispatch(setUserSessionToken(req.cookies.sigeva_user_token));
  }

  const markup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={req.url}>
        <ReactRouter />
      </StaticRouter>
    </Provider>
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.redirect(302, context.url);
  } else {
    if (context.is404) {
      status = 404;
    }
    const initialState = JSON.stringify(store.getState());
    res.status(status).render('layout', { root: markup, initialState });
  }
});

// STARTS THE SERVER
app.listen(application.port, () => {
  console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
});
