import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  return (
    <div class="flex flex-col border-2 p-10">
      <input
        placeholder="Username or Email"
        class="
						w-full mb-10 p-3 
						bg-gray-50 rounded border border-gray-300 
						focus:border-gray-400 focus:bg-white
						text-base outline-none text-gray-700 
						transition-colors duration-200 ease-in-out"
      />

      <PasswordInput />
    </div>
  );
};

export default LoginForm;
