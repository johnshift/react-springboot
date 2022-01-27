import { MSG_SOMETHING_WENT_WRONG } from "../constants";
import useToast from "../features/toast/useToast";

const SomeForm = () => {
  const { toastError } = useToast();

  return (
    <button onClick={() => toastError(MSG_SOMETHING_WENT_WRONG)}>
      toast error
    </button>
  );
};

const Home = () => {
  const { toastLoading } = useToast();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={toastLoading}>toast loading</button>

      <SomeForm />
    </div>
  );
};

export default Home;
