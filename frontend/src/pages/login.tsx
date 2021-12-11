import { NextPage } from "next";
import LoginLayout from "../features/login/LoginLayout";

const Login: NextPage = () => {
  return (
    // disable x-scroll
    <div style={{ margin: "0", height: "100vh", overflow: "hidden" }}>
      <LoginLayout />
    </div>
  );
};

export default Login;
