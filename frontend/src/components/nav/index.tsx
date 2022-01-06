import { h } from "preact";
// import { useEffect, useState } from "preact/hooks";
import Button from "../button";

import * as styles from "./nav.css";

const Nav = () => {
  // const [dataTheme, setDataTheme] = useState("light");
  // useEffect(() => {
  //   document.body.setAttribute("data-theme", dataTheme);
  // }, [dataTheme]);

  return (
    <div class={styles.wrapper}>
      <Button
      // onClick={() => setDataTheme(dataTheme === "light" ? "dark" : "light")}
      >
        toggle theme
      </Button>
    </div>
  );
};

export default Nav;
