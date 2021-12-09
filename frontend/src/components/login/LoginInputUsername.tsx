import Input from "../common/Input";
import { useLoginContext } from "./LoginContext";

const LoginUsernameInput = () => {
  const { isLoading, hasError, principal, onChangeHandler } = useLoginContext();

  if (isLoading) {
    return <div className="w-8/10 h-15 mt-10 skeleton" />;
  }

  return (
    // <div className="w-8/10 h-15 mt-10 bg-gray-400 animate-animated animate-flash animate-infinite" />
    <div className="w-8/10 h-15 mt-10">
      <Input
        name="principal"
        placeholder="Username or Email"
        isInvalid={hasError}
        value={principal}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default LoginUsernameInput;
