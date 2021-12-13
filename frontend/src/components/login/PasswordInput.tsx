import { useState } from "preact/hooks";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        class="
					w-full mb-10 p-3 
					bg-gray-50 rounded border border-gray-300 
					focus:border-gray-400 focus:bg-white
					text-base outline-none text-gray-700 
					transition-colors duration-200 ease-in-out"
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        show password
      </button>
    </>
  );
};

export default PasswordInput;
