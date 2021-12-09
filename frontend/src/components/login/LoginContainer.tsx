import { ReactNode } from "react";

const LoginContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      id="login-container"
      className="
					bg-light-500 w-450px p-10 
					border border-light-600
					rounded-lg shadow-md shadow-dark-900"
    >
      {children}
    </div>
  );
};

export default LoginContainer;
