import 'virtual:windi.css';

import { Router, Route } from 'preact-router';
import { render } from 'preact';

import { loggedIn } from './store/auth';

import Nav from './components/Nav';
import Home from './pages/home';
import NotFound from './pages/notfound';
import ProfileUser from './pages/profile_user';
import ProfileVeil from './pages/profile_veil';
import Group from './pages/group';
import Counter from './pages/counter';
import Register from './pages/register';

const Main = () => {
  return (
    <div class="bg-light-500">
      {loggedIn() && <Nav />}
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile" component={ProfileUser} />
        <Route path="/alias" component={ProfileVeil} />
        <Route path="/group" component={Group} />
        <Route path="/register" component={Register} />
        <Route path="/counter" component={Counter} />
        <Route component={NotFound} default />
      </Router>
    </div>
  );
};

render(<Main />, document.getElementById('app')!);
