import React, { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import PageLoader from "./components/PageLoader";

import { useNotif } from "./features/notification/store";
const Notification = lazy(() => import("./features/notification/Notification"));
const TestRoute = () => {
  const { error } = useNotif();

  return (
    <Suspense fallback={null}>
      <button onClick={() => error("Incorrect username/email or password")}>
        toggle notif
      </button>
      <Notification />
    </Suspense>
  );
};

const Login = lazy(() => import("./features/login/LoginPage"));

function App() {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        </Route>
        <Route path="/test">
          <TestRoute />
        </Route>
        <Route>
          <div
            style={{ display: "grid", placeItems: "center", height: "100vh" }}
          >
            <p>Page not found</p>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
