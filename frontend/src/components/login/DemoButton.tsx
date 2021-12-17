import React from "react";
import toast from "react-hot-toast";
import { TOAST_OPTIONS } from "../../lib/constants";

const DemoButton = () => {
  return (
    <button
      className="md:w-24 border border-gray-300 bg-white font-semibold hover:bg-red-700 hover:text-white"
      onClick={() => {
        toast("Work in progress. Stay tuned!", TOAST_OPTIONS);
      }}
    >
      Demo
    </button>
  );
};

export default DemoButton;
