import { render } from 'preact';
import { Route, Router } from 'preact-router';
import { Suspense } from 'preact/compat';
import PageLoader from './components/loaders/pageLoader';

import NotFound from './pages/404';
import X from './pages/x';

// import Notification from './components/notification';

import minLazy from './utils/minLazy';
const Home = minLazy(() => import('./pages/home'));
const Profile = minLazy(() => import('./pages/profile'));
const Counter = minLazy(() => import('./pages/counter'));
const Notification = minLazy(() => import('./components/notification'));

const AppRouter = () => (
  <Router>
    <Route
      path="/"
      component={() => (
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
      )}
    />
    <Route
      path="/profile"
      component={() => (
        <Suspense fallback={<PageLoader />}>
          <Profile />
        </Suspense>
      )}
    />
    <Route
      path="/counter"
      component={() => (
        <Suspense fallback={<PageLoader />}>
          <Counter />
        </Suspense>
      )}
    />
    <Route path="/x" component={X} />
    <div default>
      <NotFound />
    </div>
  </Router>
);

const App = () => (
  <>
    <AppRouter />
    <Suspense fallback={null}>
      <Notification />
    </Suspense>
  </>
);

const el = document.getElementById('pgld');
if (el) {
  el.remove();
}
render(<App />, document.getElementById('app')!);
