import React from 'react'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';

const BasicExample = () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>

    <hr/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route component={NotFound}/>
    </Switch>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

class NotFound extends React.Component {
  componentWillMount() {
    const { staticContext } = this.props;
    if (staticContext) {
      staticContext.is404 = true;
    }
  }

  render() {
    return (
      <h3>Página não encontrada</h3>
    );
  }
}

export default BasicExample;
