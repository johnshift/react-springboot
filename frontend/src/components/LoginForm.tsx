import { useState } from "react";
import {
  Box,
  VStack,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const LoginForm = () => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <Box bg="whiter" borderRadius="lg" shadow="md" p={10}>
      <VStack>
        <Input placeholder="Username or Email" />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <InputRightElement>
            <IconButton
              aria-label="show password"
              onClick={() => setshowPassword(!showPassword)}
              icon={
                <Icon as={showPassword ? BsFillEyeSlashFill : BsFillEyeFill} />
              }
            />
          </InputRightElement>
        </InputGroup>
        <Flex justify="end" w="100%">
          <Button>Login</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LoginForm;
