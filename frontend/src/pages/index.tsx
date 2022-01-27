import LoginForm from "../features/login/LoginForm";
import useToast from "../features/toast/useToast";

const Home = () => {
  const { toastLoading } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={toastLoading}>toast loading home-page</button>

      <LoginForm />
    </div>
  );
};

export default Home;
