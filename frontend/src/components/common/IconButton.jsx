import { h } from "preact";

const IconButton = ({ icon, label, className, onClick }) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      class={
        className ||
        "p-2 rounded-full hover:bg-light-500 hover:text-pink-800 focus:outline-none "
      }
    >
      {icon}
    </button>
  );
};

export default IconButton;
