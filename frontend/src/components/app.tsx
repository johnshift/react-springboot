import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import XXX from "../routes/xxx";

import Nav from "./nav";
const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <Nav />
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <Route path="/xxx" component={XXX} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
