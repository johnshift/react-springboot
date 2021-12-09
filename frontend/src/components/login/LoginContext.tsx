import { createContext, FormEvent, FormEventHandler, useContext } from "react";

type LoginContextT = {
  isLoading: boolean;
  hasError: boolean;
  handleSubmit?: FormEventHandler;
  principal: string;
  password: string;
  onChangeHandler: (e: FormEvent<HTMLInputElement>) => void;
};

export const LoginContext = createContext<LoginContextT>({
  isLoading: false,
  hasError: false,
  principal: "",
  password: "",
  onChangeHandler: () => {},
});

export const useLoginContext = () => useContext(LoginContext);
