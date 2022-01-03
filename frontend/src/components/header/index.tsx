import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";

import * as styles from "./header.css";

const Header: FunctionalComponent = () => {
  return (
    <header>
      <h1 class={styles.title}>Preact App</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/profile">Me</Link>
        <Link href="/profile/john">John</Link>
      </nav>
    </header>
  );
};

export default Header;
