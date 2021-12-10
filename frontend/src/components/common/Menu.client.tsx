import { useState } from "react";
import Center from "../layout/Center";
import MenuSvg from "../svg/MenuSvg";

const Menu = () => {
  const [msg, setMsg] = useState("");

  return (
    <div className="md:w-3/24 w-4/24 xl:w-1/10">
      <p>msg: {msg}</p>
      <button
        onClick={() => {
          setMsg("FUCK YOU");
        }}
      >
        click
      </button>
      <Center>
        <button
          type="button"
          aria-label="options menu"
          className="p-3 rounded-lg hover:bg-light-800 hover:text-red-800"
        >
          <MenuSvg />
        </button>
      </Center>
    </div>
  );
};

export default Menu;
