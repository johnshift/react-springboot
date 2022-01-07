import { render } from 'preact';
import { Route, Switch } from 'wouter-preact';

import NotFound from './pages/404';
import PageLoader from './components/loaders/pageLoader';
import { Suspense } from 'preact/compat';

import minLazy from './utils/minLazy';

const Home = minLazy(() => import('./pages/home'));
const Profile = minLazy(() => import('./pages/profile'));
const Counter = minLazy(() => import('./pages/counter'));

const App = () => (
  <>
    <Switch>
      <Route path="/">
        <Suspense fallback={<PageLoader text="loading home page ..." />}>
          <Home />
        </Suspense>
      </Route>
      <Route path="/profile">
        <Suspense fallback={<PageLoader text="loading profile page ..." />}>
          <Profile />
        </Suspense>
      </Route>
      <Route path="/counter">
        <Suspense fallback={<PageLoader />}>
          <Counter />
        </Suspense>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </>
);

const el = document.getElementById('app')!;
el.textContent = '';
render(<App />, el);
