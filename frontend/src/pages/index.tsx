import Toast from "../components/toast";
import useToast from "../components/toast/useToast";

const Home = () => {
  const { msg, show, severity, toastClose, toastLoading } = useToast();

  return (
    <div>
      <h1>Home page</h1>
      <button
        onClick={() => {
          console.log("button click");
          toastLoading();
        }}
      >
        show toast
      </button>

      <p>msg = {msg}</p>
      <p>show = {show.toString()}</p>

      <br />
      <br />
      <Toast show={show} msg={msg} severity={severity} onExited={toastClose} />
    </div>
  );
};

export default Home;
