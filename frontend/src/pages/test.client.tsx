import Button from "../components/common/Button";
import toast from "react-hot-toast";

const notify = () => toast("Here is your toast.");

const TestPage = () => {
  return (
    <>
      <Button onClick={notify}>Click me</Button>
    </>
  );
};

export default TestPage;
