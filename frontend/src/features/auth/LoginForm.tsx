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
  FormControl,
  FormHelperText,
  Text,
  useToast,
} from "@chakra-ui/react";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { LoginInput, LoginError, SessionT } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";

import axios, { AxiosError, AxiosResponse } from "axios";
import { AUTH_LOGIN_URL, BACKEND_API_URL } from "../../constants";
import { useSetRecoilState } from "recoil";
import { sessionAtom } from "../../recoil/auth/atom";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const toast = useToast();

  const [showPassword, setshowPassword] = useState(false);

  const setSessionState = useSetRecoilState(sessionAtom);

  const [errMsg, setErrMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    axios
      .post<SessionT>(AUTH_LOGIN_URL, {
        username: data.username.toLowerCase(),
        password: data.password,
      })
      .then((res: AxiosResponse<SessionT>) => {
        if (res.data) {
          setErrMsg("");
          clearErrors();
          setSessionState(res.data);
          console.log("LOGIN res.data: ", res.data);
          axios.defaults.headers.common["X-CSRF-TOKEN"] = res.data.csrfToken;
          toast({
            status: "success",
            title: "Welcome " + res.data.name,
            description: "You have successfully logged in",
          });
          router.push("/");
        }
      })
      .catch((err: AxiosError<LoginError>) => {
        if (err.response) {
          // const { field, message } = err.response.data;
          // setError(field, { type: "manual", message: message });
          const { message } = err.response.data;
          setErrMsg(message);
        }
      });
  };

  return (
    <Box bg="whiter" borderRadius="lg" shadow="md" p={10}>
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5} id="chakra-issue-#4328-1">
            <Input
              placeholder="Username or Email"
              {...register("username", { required: "Username is required" })}
              isInvalid={errMsg !== "" || errors.username !== undefined}
            />
            {errors.username && (
              <FormHelperText color="red.500" role="alert">
                {errors.username.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={5} id="chakra-issue-#4328-2">
            <InputGroup size="md" mb={5}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                isInvalid={errMsg !== "" || errors.password !== undefined}
              />
              <InputRightElement>
                <IconButton
                  aria-label="show password"
                  onClick={() => setshowPassword(!showPassword)}
                  icon={
                    <Icon
                      as={showPassword ? BsFillEyeSlashFill : BsFillEyeFill}
                    />
                  }
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormHelperText color="red.500" role="alert">
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>
          {errMsg !== "" && (
            <Text color="red" mb={5}>
              {errMsg}
            </Text>
          )}

          <Flex justify="end" w="100%">
            <Button type="submit">Login</Button>
          </Flex>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginForm;
