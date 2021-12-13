const DemoButton = () => {
  const onClick = () => {
    console.log("fuck you");
  };

  return (
    <button
      class="
				 py-2 px-4 rounded-lg w-24
				text-white font-semibold hover:text-white 
				bg-red-800 hover:bg-red-600
			"
      onClick={onClick}
    >
      Demo
    </button>
  );
};

export default DemoButton;
