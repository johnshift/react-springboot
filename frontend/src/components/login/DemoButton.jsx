import { h } from "preact"
import { notify } from "../../store/NotificationStore";

const DemoButton = () => {
  return (
    <button
      className="md:w-24 border border-gray-300 bg-white font-semibold hover:bg-red-700 hover:text-white"
      onClick={() => {
        notify("Work in progress. Stay tuned!", "info");
      }}
    >
      Demo
    </button>
  );
};

export default DemoButton;
