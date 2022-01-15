import axios, { AxiosError, AxiosResponse } from "axios";
import { BACKEND_API_URL } from "../../constants";

interface Props {
  thenFn: (res: AxiosResponse) => void;
  catchFn: (err: Error | AxiosError) => void;
  payload: { principal: string; password: string };
}

const apiLogin = async ({ thenFn, catchFn, payload }: Props) => {
  // await axios
  //   .post(`${BACKEND_API_URL}/login`)
  //   .then((res: AxiosResponse) => {
  //     thenFn(res);
  //   })
  //   .catch((err: AxiosError) => {
  //     catchFn(err);
  //   });

  try {
    const res = await axios.post(`${BACKEND_API_URL}/login`, payload);
    console.log("apiLogin res: ", res);
    thenFn(res);
  } catch (err) {
    catchFn(err as Error | AxiosError);
  }
};

export default apiLogin;
