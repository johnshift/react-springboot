import { Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import useDisclosure from "../common/hooks/useDisclosure";
import LoginFormDialog from "../features/login/LoginFormDialog";
import useToast from "../features/toast/useToast";
import { useAppSelector } from "../store";

const Home = () => {
  const { toastLoading } = useToast();

  const {
    show: showLogin,
    close: closeLogin,
    open: openLogin,
  } = useDisclosure();

  const { name, description, username, verified } = useAppSelector(
    (state) => state.user
  );

  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/demo" passHref>
        <MuiLink underline="hover" color="inherit">
          /demo
        </MuiLink>
      </Link>
      <br />
      <br />
      <br />
      <Link href="/anonymous1" passHref>
        <MuiLink underline="hover" color="inherit">
          /anonymous1
        </MuiLink>
      </Link>
      <br />
      <br />
      <br />
      <Link href="/asdf" passHref>
        <MuiLink underline="hover" color="inherit">
          /asdf
        </MuiLink>
      </Link>
      <br />
      <br />
      <br />
      <button onClick={toastLoading}>toast loading home-page</button>

      <div style={{ position: "fixed", bottom: 10, right: 10 }}>
        <Button variant="contained" onClick={openLogin}>
          show login
        </Button>
      </div>

      <br />
      <br />
      <br />
      <div>
        <p>name = {name}</p>
        <p>description = {description}</p>
        <p>username = {username}</p>
        <p>isVerified = {verified.toString()}</p>
      </div>

      <LoginFormDialog open={showLogin} onClose={closeLogin} />
    </div>
  );
};

export default Home;
