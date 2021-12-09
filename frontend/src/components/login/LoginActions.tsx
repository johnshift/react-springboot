const LoginActions = () => {
  return (
    <div
      className="
							flex mt-10 h-15 w-8/10 pr-3 
							justify-between items-center"
    >
      <button
        className="
							py-2 px-4 rounded h-15 w-4/10 mr-5
							bg-transparent hover:bg-red-700 
							 text-lg text-warm-gray-600 hover:text-light-800
							font-semibold"
      >
        Login
      </button>
      <div className="align-self-center">
        <a href="#" className="text-red-700 hover:font-medium hover:underline">
          Create an account
        </a>
      </div>
    </div>
  );
};

export default LoginActions;
