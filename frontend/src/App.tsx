import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./features/home/HomePage"));
const Login = lazy(() => import("./features/login/LoginPage"));

function App() {
  return (
    <>
      <Switch>
        <Route path="/">
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        </Route>
        <Route path="/login">
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
}

export default App;
