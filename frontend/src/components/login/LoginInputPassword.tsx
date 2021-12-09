import Input from "../common/Input";
import { useLoginContext } from "./LoginContext";

const LoginInputPassword = () => {
  const { isLoading, hasError, password, onChangeHandler } = useLoginContext();

  if (isLoading) {
    return <div className="w-8/10 h-15 mt-10 skeleton" />;
  }

  return (
    <div className="w-8/10 h-15 mt-10">
      <Input
        name="password"
        placeholder="Password"
        type="password"
        isInvalid={hasError}
        value={password}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default LoginInputPassword;
