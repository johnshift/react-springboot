import axios from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";
import RegisterContext from "./RegisterContext";

/**
 *
 * @param availabilityPath string in the form `:field/:value`
 * @returns
 */
const apiAvailability = async (availabilityPath: string) => {
  const { data } = await axios.get(
    `${BACKEND_API_URL}/availability/${availabilityPath}`
  );
  return data;
};

export const useValidated = (field: keyof RegisterState) => {
  const {
    started,
    setStarted,
    payload,
    onChangeHandler,
    // availabilityState,
    // setAvailabilityState,
    registerState,
    setRegisterState,
  } = useContext(RegisterContext);
  const value = payload[field];

  const { isLoading, mutateAsync } = useMutation(apiAvailability);

  const onBlur = async () => {
    if (!value) {
      return;
    }
    if (!started) {
      setStarted(true);
    }
    try {
      const _isValid = await mutateAsync(`${field}/${value}`);
      setRegisterState((prev) => ({
        ...prev,
        [field]: {
          isValid: _isValid,
          msg: `${field[0].toUpperCase() + field.slice(1)} is ${
            _isValid ? "" : "not"
          } available`,
          msgColor: _isValid ? "green" : "red",
        },
      }));
    } catch (err) {
      setRegisterState((prev) => ({
        ...prev,
        [field]: {
          isValid: false,
          msg: MSG_SOMETHING_WENT_WRONG,
          msgColor: "red",
        },
      }));
    }
  };

  return {
    started,
    onBlur,
    isLoading,
    isValid: registerState[field].isValid,
    msg: isLoading ? "loading ..." : registerState[field].msg,
    msgColor: isLoading ? "inherit" : registerState[field].msgColor,
    payload,
    onChangeHandler,
  };
};
