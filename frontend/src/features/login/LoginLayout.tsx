import { Flex } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import LoginHero from "./LoginHero";

const LoginLayout = () => {
  return (
    <Flex
      h="100vh"
      // align={["start", "center"]}
      align="center"
      // justify={["start", "center"]}
      justify={["start", "center"]}
      mx={["0", "5%", "20%", "25%"]}
      direction={["column", "row"]}
    >
      <LoginHero />
      <LoginForm />
    </Flex>
  );
};

export default LoginLayout;
