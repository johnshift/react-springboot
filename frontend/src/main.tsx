import 'virtual:windi.css';

import { Router, Route } from 'preact-router';
import AsyncRoute from 'preact-async-route';
import { render } from 'preact';

import Home from './pages/Home';

const Main = () => (
  <Router>
    <Route path="/" component={Home} />
    <AsyncRoute
      path="/counter"
      getComponent={() => import('./pages/Counter').then((module) => module.default)}
      loading={() => <div>loading...</div>}
    />
  </Router>
);

render(<Main />, document.getElementById('app')!);
