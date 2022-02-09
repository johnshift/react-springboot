import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import useToast from "../toast/useToast";

const useVerification = () => {
  const router = useRouter();
  const { token } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  const { toastSuccess, toastError } = useToast();

  useEffect(() => {
    if (router.isReady) {
      axios
        .post(`${BACKEND_API_URL}/register/verification/${token}`)
        .then(() => {
          toastSuccess("Account verification successful!");
        })
        .catch((err) => {
          console.log("api verification err =", err);
          toastError("Verification failed");
        })
        .finally(() => {
          setIsLoading(false);
          router.push("/");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return {
    isLoading,
  };
};

export default useVerification;
