import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';

import BasicExample from './BasicExample';

const App = () => (
  <StaticRouter>
    <BasicExample />
  </StaticRouter>
);

export default App;
