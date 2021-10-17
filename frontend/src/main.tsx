import 'virtual:windi.css';

import { Router, Route } from 'preact-router';
import { render } from 'preact';

import { loggedIn } from './store/auth';

import Nav from './components/Nav';
import Home from './pages/home';
import NotFound from './pages/notfound';
import Profile from './pages/profile';
import Alias from './pages/alias';
import Group from './pages/group';
import Counter from './pages/counter';

const Main = () => {
  return (
    <>
      {loggedIn() && <Nav />}
      {/* <Nav /> */}
      <div
        class="
        border-2 pt-25 w-full mx-auto md:w-9/10 lg:w-8/10 xl:w-50/100 z-1"
      >
        <Router>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/alias" component={Alias} />
          <Route path="/group" component={Group} />
          <Route path="/counter" component={Counter} />
          <Route component={NotFound} default />
        </Router>
      </div>
    </>
  );
};

render(<Main />, document.getElementById('app')!);
