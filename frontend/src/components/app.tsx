import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/home";
import Profile from "../routes/profile";
import NotFoundPage from "../routes/notfound";
import Header from "./header";

import Toast from "./toast";
import { css } from "@linaria/core";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      {/* <Header /> */}
      <Router>
        <Route path="/" component={Home} />
        <Route path="/profile/" component={Profile} user="me" />
        <Route path="/profile/:user" component={Profile} />
        <NotFoundPage default />
      </Router>
      <Toast />
    </div>
  );
};

export default App;

export const globals = css`
  :global() {
    :root {
      --sc-md: 48em;
      --sc-lg: 66em;
      --sc-hd: 98em;

      --clr-border: #d1d5db;
      --clr-red: #b91c1c;
      --clr-dark: #3f3f46;
    }

    body {
      font-family: "Roboto", sans-serif;
      color: var(--clr-dark);
    }

    input {
      padding: 1em;
      outline: none;
      border-radius: 0.75em;
      border: 1px solid var(--clr-border);
      font-size: inherit;
    }

    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: inherit;
    }

    a {
      color: inherit;
    }

    a:hover {
      color: var(--clr-red);
      text-decoration: underline;
    }
  }
`;
