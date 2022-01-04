import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";
import XXX from "../routes/xxx";

import { lightTheme, darkTheme } from "../theme.css";
import { useEffect, useState } from "preact/hooks";

const App: FunctionalComponent = () => {
  const [isLight, setLight] = useState(true);

  return (
    <div id="preact_root" class={isLight ? lightTheme : darkTheme}>
      <Header />
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
