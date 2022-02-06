import { ChangeEvent, FormEvent, useState } from "react";
import useToast from "../toast/useToast";
import {
  MSG_SOMETHING_WENT_WRONG,
  REGEXP_EMAIL,
  REGEXP_NEAT_URI,
} from "../../constants";
import sleep from "../../utils/sleep";
import apiLogin from "./apiLogin";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";
import { LoginPayload } from "./types";
import { ToastMsgError } from "../toast/types";
import { useAppDispatch } from "../../store";
import { afterLogin } from "../userInfo/userInfoSlice";

export const useLoginForm = ({ onClose }: { onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = useState<LoginPayload>({
    principal: "",
    password: "",
  });

  const { toastLoading, toastError, toastSuccess } = useToast();

  const dispatch = useAppDispatch();

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const loadingIndicator = (isLoading: boolean) => {
    setLoading(isLoading);
    toastLoading();
  };

  const isValid = (principal: string, password: string): boolean => {
    const MIN_PRINCIPAL_LENGTH = 4;
    const MIN_PASSWORD_LENGTH = 6;
    const MAX_LOGIN_INPUT_LENGTH = 64;

    if (!principal) {
      return false;
    }

    if (!password) {
      return false;
    }

    if (
      principal.length < MIN_PRINCIPAL_LENGTH ||
      principal.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return false;
    }

    if (
      password.length < MIN_PASSWORD_LENGTH ||
      password.length > MAX_LOGIN_INPUT_LENGTH
    ) {
      return false;
    }

    if (!REGEXP_NEAT_URI.test(principal) && !REGEXP_EMAIL.test(principal)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasError(false);

    if (!isValid(payload.principal, payload.password)) {
      setHasError(true);
      toastError(LOGIN_MSG_INCORRECT);
      return;
    }

    loadingIndicator(true);
    await Promise.all([apiLogin(payload), sleep(300)]).then(
      ([[success, msg, afterLoginResp]]) => {
        loadingIndicator(false);
        if (success) {
          toastSuccess(LOGIN_MSG_OK);
          dispatch(afterLogin(afterLoginResp as AfterLoginAction));

          // close login dialog
          onClose();
        } else {
          setHasError(msg !== MSG_SOMETHING_WENT_WRONG);
          toastError(msg as ToastMsgError);
        }
      }
    );
  };

  return {
    payload,
    onChangeHandler,
    showPassword,
    togglePassword,
    hasError,
    setHasError,
    loading,
    loadingIndicator,
    isValid,
    handleSubmit,
  };
};
