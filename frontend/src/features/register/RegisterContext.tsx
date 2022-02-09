import { ChangeEvent, createContext, Dispatch, SetStateAction } from "react";

interface IRegisterContext {
  started: boolean;
  activeStep: number;
  toggleState: ToggleState;
  payload: RegisterPayload;
  registerState: RegisterState;
  isLoading: boolean;

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setStarted: Dispatch<SetStateAction<boolean>>;
  toggleField: (field: ToggledField) => void;
  handleStep: (isNext: boolean) => void;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  setPayload: Dispatch<React.SetStateAction<RegisterPayload>>;
  setRegisterState: Dispatch<React.SetStateAction<RegisterState>>;
}

const RegisterContext = createContext<IRegisterContext>({} as IRegisterContext);

export default RegisterContext;
