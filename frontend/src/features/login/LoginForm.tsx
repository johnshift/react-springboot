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
import { route } from "next/dist/server/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthProvider";
import {
  API_LOGIN_URL,
  AUTHORIZATION_KEY,
  DEFAULT_TOAST_DURATION,
  MSG_ALREADY_LOGGED_IN,
  MSG_LOGIN_SUCCESSFUL,
  MSG_SOMETHING_WENT_WRONG,
  TOAST_STATUS_ERROR,
  TOAST_STATUS_INFO,
  TOAST_STATUS_SUCCESS,
} from "../../lib/constants";
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
  const [hasError, setHasError] = useState(false);

  const toast = useToast();
  const router = useRouter();
  const { authLoading, setAuthLoading, isAuthenticated, authLogin } = useAuth();

  useEffect(() => {
    const redirectToHomePage = async () => {
      setAuthLoading(true);
      await router.push("/").then(() => {
        setAuthLoading(false);
        toast({
          title: MSG_ALREADY_LOGGED_IN,
          status: TOAST_STATUS_INFO,
          duration: DEFAULT_TOAST_DURATION,
        });
      });
    };

    // redirect to homepage if already loggedin
    if (!authLoading && isAuthenticated) {
      redirectToHomePage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isAuthenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    let message = MSG_SOMETHING_WENT_WRONG;
    let withErr = false;
    let token: string | null = null;

    await axios
      .post(API_LOGIN_URL, { principal, password })
      .then((res: AxiosResponse<MessageResponse>) => {
        token = res.headers[AUTHORIZATION_KEY];
        console.log("received token: ", token);
        console.log("then message: ", res.data.message);
      })
      .catch((err: AxiosError) => {
        const response = err.response;
        if (response && response.status >= 400) {
          // only display input errors on 4xx status
          if (response.status < 500) {
            withErr = true;
          }

          message = (err.response as AxiosResponse<MessageResponse>).data
            .message;
        }
      })
      .finally(async () => {
        setHasError(withErr);

        // handle success login
        if (!withErr && token) {
          console.log("withErr =", withErr, "  token =", token);
          setAuthLoading(true);
          await authLogin(token);
          toast({
            title: MSG_LOGIN_SUCCESSFUL,
            status: TOAST_STATUS_SUCCESS,
            duration: DEFAULT_TOAST_DURATION,
          });
          await router.push("/").then(() => {
            setAuthLoading(false);
          });

          return;
        }

        // handle failed login
        toast({
          title: message,
          status: TOAST_STATUS_ERROR,
          duration: DEFAULT_TOAST_DURATION,
        });
        setIsLoading(false);
      });
  };

  const isLoaded = !(isLoading || authLoading);

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
          <Skeleton isLoaded={isLoaded} data-testid="skeleton-principal">
            <FormControl mb={10} id="chakra-issue-#4328-1">
              <Input
                placeholder="Username or Email"
                size="lg"
                value={principal}
                onInput={(e) =>
                  setPrincipal((e.target as HTMLInputElement).value)
                }
                isInvalid={hasError}
              />
            </FormControl>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} data-testid="skeleton-password">
            <InputGroup size="lg">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onInput={(e) =>
                  setPassword((e.target as HTMLInputElement).value)
                }
                isInvalid={hasError}
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

          {isLoaded && (
            <Flex justify="between" w="100%" align="center" mt={10}>
              <Box
                pl={2}
                _hover={{ textDecoration: "underline", color: "red.600" }}
              >
                <ChakraLink as={Link} href="/signup">
                  Create an account
                </ChakraLink>
              </Box>
              <Spacer />
              <Box>
                <Button type="submit">Login</Button>
              </Box>
            </Flex>
          )}
        </form>
      </Box>
    </FormWrapper>
  );
};

export default LoginForm;
