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
  useToast,
} from "@chakra-ui/react";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { LoginInput, LoginError, LoginResponse } from "../models/auth";
import { useForm, SubmitHandler } from "react-hook-form";

import axios, { AxiosError, AxiosResponse } from "axios";

const LoginForm = () => {
  const toast = useToast();

  const [showPassword, setshowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    axios
      .post("/auth", {
        username: data.username,
        password: data.password,
      })
      .then((res: AxiosResponse<LoginResponse>) => {
        if (res.data) {
          toast({
            status: "success",
            title: "Welcome " + res.data.name,
            description: "You have successfully logged in",
          });
        }
      })
      .catch((err: AxiosError<LoginError>) => {
        if (err.response) {
          const { field, message } = err.response.data;
          setError(field, { type: "manual", message: message });
        }
      });
  };

  return (
    <Box bg="whiter" borderRadius="lg" shadow="md" p={10}>
      <VStack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5}>
            <Input
              placeholder="Username or Email"
              {...register("username", { required: "Username is required" })}
              isInvalid={errors.username != undefined}
            />
            {errors.username && (
              <FormHelperText color="red.500" role="alert">
                {errors.username.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mb={5}>
            <InputGroup size="md">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                isInvalid={errors.password != undefined}
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
          <Flex justify="end" w="100%">
            <Button type="submit">Login</Button>
          </Flex>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginForm;
