import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import BasicExample from './BasicExample';

const App = () => (
  <BrowserRouter>
    <BasicExample />
  </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
