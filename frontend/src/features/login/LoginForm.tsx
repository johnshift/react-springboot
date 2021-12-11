import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Link as ChakraLink,
  Skeleton,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { MessageResponse } from "../../types";

const FormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      w={["100%", "50%"]}
      //  border="1px solid red"
    >
      <Center h="100%">{children}</Center>
    </Box>
  );
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let toastStatus = "error" as UseToastOptions["status"];
    let message = "Something went wrong :(";

    await axios
      .post("/api/login", { principal, password })
      .then((res: AxiosResponse<MessageResponse>) => {
        alert("new token: " + res.headers["authorization"]);
        toastStatus = "success";
        message = res.data.message;
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status >= 400) {
          message = (err.response as AxiosResponse<MessageResponse>).data
            .message;
        }
      })
      .finally(() => {
        setIsLoading(false);
        toast({
          title: message,
          status: toastStatus,
          duration: 4000,
        });
      });
  };

  return (
    <FormWrapper>
      <Box
        borderRadius="lg"
        p={10}
        shadow={["", "md"]}
        border={["", "1px solid #EDF2F7"]}
        // mt={["-50px", "0"]}
        // border="1px solid red"
      >
        <form onSubmit={handleSubmit}>
          <Skeleton isLoaded={!isLoading}>
            <FormControl mb={10} id="chakra-issue-#4328-1">
              <Input
                placeholder="Username or Email"
                size="lg"
                value={principal}
                onInput={(e) =>
                  setPrincipal((e.target as HTMLInputElement).value)
                }
              />
            </FormControl>
          </Skeleton>

          <Skeleton isLoaded={!isLoading}>
            <InputGroup size="lg">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
              />
              <InputRightElement>
                <IconButton
                  aria-label="show password"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={
                    <Icon
                      as={showPassword ? BsFillEyeSlashFill : BsFillEyeFill}
                    />
                  }
                />
              </InputRightElement>
            </InputGroup>
          </Skeleton>

          {!isLoading && (
            <Flex justify="between" w="100%" align="center" mt={10}>
              <Box
                pl={2}
                color="gray.500"
                _hover={{ textDecoration: "underline", color: "red.600" }}
              >
                <ChakraLink as={Link} href="/signup">
                  Create an account
                </ChakraLink>
              </Box>
              <Spacer />
              <Box>
                <Button type="submit" colorScheme="red">
                  Login
                </Button>
              </Box>
            </Flex>
          )}
        </form>
      </Box>
    </FormWrapper>
  );
};

export default LoginForm;
