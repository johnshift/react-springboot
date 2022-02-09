import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../store";
import sleep from "../../utils/sleep";
import apiLogin from "../login/apiLogin";
import { LoginPayload } from "../login/types";
import useToast from "../toast/useToast";
import { afterLogin } from "../userInfo/userInfoSlice";
import apiRegister from "./apiRegister";

const useRegister = () => {
  const [started, setStarted] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (isNext: boolean) => {
    const num = isNext ? +1 : -1;
    setActiveStep((prev) => prev + num);
  };

  const [toggleState, setToggleState] = useState({
    password: false,
    veil: false,
  });
  const toggleField = (field: ToggledField) => {
    setToggleState({
      ...toggleState,
      [field]: !toggleState[field],
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    desc: "",
    veil: "",
    veildesc: "",
  });

  const [registerState, setRegisterState] = useState<RegisterState>({
    username: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    email: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    password: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    firstname: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    lastname: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    desc: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    veil: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    veildesc: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const { toastLoading, toastSuccess, toastError } = useToast();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const register = async () => {
    setIsLoading(true);
    toastLoading();
    await Promise.all([apiRegister(payload), sleep(300)]).then(
      async ([[success, msg]]) => {
        setIsLoading(false);
        if (success) {
          toastSuccess(msg);
          handleStep(true);
          const [, , afterLoginResp] = await apiLogin({
            principal: payload.username,
            password: payload.password,
          } as LoginPayload);
          dispatch(afterLogin(afterLoginResp as AfterLoginAction));
          router.push("/");
        } else {
          toastError(msg);
        }
      }
    );
  };

  return {
    started,
    setStarted,
    activeStep,
    handleStep,
    toggleState,
    toggleField,
    payload,
    setPayload,
    onChangeHandler,
    registerState,
    setRegisterState,
    register,
    isLoading,
    setIsLoading,
  };
};

export default useRegister;
