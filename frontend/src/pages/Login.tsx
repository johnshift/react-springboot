import {
  Box,
  Text,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  Button,
  useToast
} from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import PageCenter from '../common/components/PageCenter';
import { JWT_HEADER_KEY, LOGIN_SUCCESS_MSG, LOGIN_URI } from '../common/constants';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const Login = () => {
  const [, setLocation] = useLocation();

  const toast = useToast();

  const throwToast = (type: 'info' | 'warning' | 'success' | 'error' | undefined, msg: string) => {
    toast({
      title: msg,
      status: type,
      duration: 3000
    });
  };

  useEffect(() => {
    // redirect to homepage if already logged in
    if (localStorage.getItem(JWT_HEADER_KEY)) {
      toast({
        title: 'You are already logged in.',
        status: 'info',
        duration: 3000
      });
      setLocation('/');
    }
  }, []);

  const [principal, setPrincipal] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errLogin, setErrLogin] = useState(false);

  const login = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        LOGIN_URI,
        { principal, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        throwToast('success', LOGIN_SUCCESS_MSG);

        const token = res.headers[JWT_HEADER_KEY];

        // save token to localstorage
        localStorage.setItem(JWT_HEADER_KEY, token);

        setLocation('/');
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          const errmsg = error.response.data.message;
          setErrLogin(true);
          throwToast('error', errmsg);
        } else {
          console.log('err: ', error);
          throwToast('error', 'Something went wrong :(');
        }
      });
  };

  return (
    <PageCenter>
      <Box borderRadius="lg" shadow="md" p={10} bg="whiter">
        <form onSubmit={login}>
          <FormControl mb={5}>
            <Input
              placeholder="Username or Email"
              isInvalid={errLogin}
              onInput={(e) => setPrincipal((e.target as HTMLInputElement).value)}
            />
          </FormControl>
          <FormControl>
            <InputGroup size="md" mb={5}>
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                isInvalid={errLogin}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
              />
              <InputRightElement>
                <IconButton
                  aria-label="show password"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={<Icon as={showPassword ? BsFillEyeFill : BsFillEyeSlashFill} />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Box w="100%">
            <Button type="submit" w="100%">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </PageCenter>
  );
};

export default Login;
