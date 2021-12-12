import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthProvider";
import {
  API_LOGIN_URL,
  AUTHORIZATION_KEY,
  DEFAULT_TOAST_DURATION,
  DEMO_PASSWORD,
  DEMO_PRINCIPAL,
  DEMO_WELCOME_MESSAGE,
  MSG_SOMETHING_WENT_WRONG,
  TOAST_STATUS_ERROR,
  TOAST_STATUS_SUCCESS,
} from "../../lib/constants";

const LoginHero = () => {
  const toast = useToast();
  const router = useRouter();
  const { authLoading, setAuthLoading, authLogin } = useAuth();

  const handleDemoLogin = async () => {
    setAuthLoading(true);
    await axios
      .post(API_LOGIN_URL, {
        principal: DEMO_PRINCIPAL,
        password: DEMO_PASSWORD,
      })
      .then(async (res) => {
        const token = res.headers[AUTHORIZATION_KEY];
        await authLogin(token);
        toast({
          title: DEMO_WELCOME_MESSAGE,
          status: TOAST_STATUS_SUCCESS,
          duration: DEFAULT_TOAST_DURATION,
        });
        await router.push("/").then(() => {
          setAuthLoading(false);
        });
      })
      .catch(() => {
        setAuthLoading(false);
        toast({
          title: MSG_SOMETHING_WENT_WRONG,
          status: TOAST_STATUS_ERROR,
          duration: DEFAULT_TOAST_DURATION,
        });
      });
  };

  return (
    <Box
      mt={["10", "0"]}
      h={["40%", "auto"]}
      w={["100%", "50%"]}
      pl={[10, 0]}
      // border="1px solid green"
      // bg={["red", "green", "blue", "yellow"]}
    >
      <Center h="100%" w="100%">
        <Flex direction="column">
          <Box w="100%" mb={10}>
            <Heading size="4xl" fontWeight="extrabold" color="red.600">
              veils
            </Heading>
          </Box>
          <Box mb={10}>
            <Heading size="lg" color="gray.600">
              Share your secrets anonymously
            </Heading>
          </Box>
          <Skeleton isLoaded={!authLoading} w="80px">
            <Button onClick={handleDemoLogin}>demo</Button>
          </Skeleton>
        </Flex>
      </Center>
    </Box>
  );
};

export default LoginHero;
