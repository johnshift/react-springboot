import { Button } from "@mui/material";
import useDisclosure from "../common/hooks/useDisclosure";
import LoginFormDialog from "../features/login/LoginFormDialog";
import useToast from "../features/toast/useToast";

const Home = () => {
  const { toastLoading } = useToast();

  const {
    show: showLogin,
    close: closeLogin,
    open: openLogin,
  } = useDisclosure();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={toastLoading}>toast loading home-page</button>

      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <Button variant="contained" onClick={openLogin}>
          show login
        </Button>
      </div>
      <LoginFormDialog open={showLogin} onClose={closeLogin} />
    </div>
  );
};

export default Home;
