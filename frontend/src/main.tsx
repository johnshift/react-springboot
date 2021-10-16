import 'virtual:windi.css';

import { Router, Route } from 'preact-router';
import { render } from 'preact';
import AsyncRoute from 'preact-async-route';

import Home from './pages/home';
import PageLoader from './components/PageLoader';
import NotFound from './pages/notfound';

const Main = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <AsyncRoute
          path="/profile"
          getComponent={() => import('./pages/profile').then((module) => module.default)}
          loading={() => <PageLoader />}
        />
        <AsyncRoute
          path="/alias"
          getComponent={() => import('./pages/alias').then((module) => module.default)}
          loading={() => <PageLoader />}
        />
        <AsyncRoute
          path="/group"
          getComponent={() => import('./pages/group').then((module) => module.default)}
          loading={() => <PageLoader />}
        />
        <AsyncRoute
          path="/counter"
          getComponent={() => import('./pages/counter').then((module) => module.default)}
          loading={() => <PageLoader />}
        />
        <Route component={NotFound} default />
      </Router>
    </>
  );
};

render(<Main />, document.getElementById('app')!);
