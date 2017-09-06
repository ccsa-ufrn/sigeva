import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import BasicExample from './BasicExample';

class App extends React.Component {
  render() {
    return (
      <BasicExample/>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));

export default App;
