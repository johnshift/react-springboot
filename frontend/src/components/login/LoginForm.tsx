import LoginActions from "./LoginActions";
import LoginContainer from "./LoginContainer";
import { useLoginContext } from "./LoginContext";
import LoginInputPassword from "./LoginInputPassword";
import LoginInputUsername from "./LoginInputUsername";
import LoginSkeleton from "./LoginSkeleton";
import LoginTitle from "./LoginTitle";

const LoginForm = () => {
  const { isLoading, handleSubmit } = useLoginContext();

  if (isLoading) {
    return <LoginSkeleton />;
  }

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-center">
          <LoginTitle />
          <LoginInputUsername />
          <LoginInputPassword />
          <LoginActions />
        </div>
      </form>
    </LoginContainer>
  );
};

export default LoginForm;
