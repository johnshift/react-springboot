import 'virtual:windi.css';

import { Router, Route } from 'preact-router';
import { render } from 'preact';

import { loggedIn } from './store/auth';

import Nav from './components/Nav';
import Home from './pages/home';
import NotFound from './pages/notfound';
import Counter from './pages/counter';
import Register from './pages/register';
import Match from 'preact-router/match';
import PrettyRoute from './pages/pretty_routes';

const Main = () => {
  return (
    <div class="bg-light-500">
      {loggedIn() && <Nav />}
      <Router>
        <Route path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/counter" component={Counter} />
        <Match path="/:something">
          {({ path }: { path: string }) => {
            return <PrettyRoute path={path} />;
          }}
        </Match>
        <Route component={NotFound} default />
      </Router>
    </div>
  );
};

render(<Main />, document.getElementById('app')!);
