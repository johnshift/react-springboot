import LoginContainer from "./LoginContainer";
import LoginTitle from "./LoginTitle";

const LoginSkeleton = () => {
  return (
    <LoginContainer>
      <div className="flex flex-wrap justify-center">
        <LoginTitle />
        <div className="w-8/10 h-15 mt-10 bg-gray-400 border border-gray-400 animate-animated animate-flash animate-infinite" />
        <div className="w-8/10 h-15 mt-10 bg-gray-400 border border-gray-400 animate-animated animate-flash animate-infinite" />
        <div
          className="
							flex mt-10 w-8/10 pr-3 h-15
							justify-center items-center text-center"
        />
      </div>
    </LoginContainer>
  );
};

export default LoginSkeleton;
