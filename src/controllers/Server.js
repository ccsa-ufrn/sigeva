import express from 'express';
import React from 'react';
import path from 'path';

import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import ReactRouter from '../components/Router';
import app from './App';
import { application } from '../../config';

console.log(`Application enviroment is ${process.env.NODE_ENV}`);

app.set('views', path.resolve('src/view'));
app.set('view engine', 'ejs');

// SETINGS FOR STATIC FILES
app.use('/public', express.static(path.resolve('public')));

// HANDLE ALL OTHERS REQUESTS
app.get('*', (req, res) => {
  const context = {};
  let status = 200;
  const markup = ReactDOMServer.renderToString(
    <StaticRouter context={context} location={req.url}>
      <ReactRouter />
    </StaticRouter>
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.is404) {
    status = 404;
  }
  res.status(status).render('layout', { root: markup });
});

// STARTS THE SERVER
app.listen(application.port, () => {
  console.log(`Starting Express ${application.name} ${application.version} at ::${application.port}`);
});
