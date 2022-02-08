import { ChangeEvent, useState } from "react";

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

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
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
      isValid: true,
      msg: "",
      msgColor: "",
    },
    name: {
      isValid: true,
      msg: "",
      msgColor: "",
    },
    desc: {
      isValid: true,
      msg: "",
      msgColor: "",
    },
    veil: {
      isValid: false,
      msg: "",
      msgColor: "",
    },
    veildesc: {
      isValid: true,
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
  };
};

export default useRegister;
