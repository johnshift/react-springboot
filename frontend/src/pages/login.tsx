import { useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import LoginLayout from "../features/login/LoginLayout";
import { MSG_ALREADY_LOGGED_IN } from "../lib/constants";

const Login: NextPage = () => {
  return (
    // disable x-scroll
    <div style={{ margin: "0", height: "100vh", overflow: "hidden" }}>
      <LoginLayout />
    </div>
  );
};

export default Login;
