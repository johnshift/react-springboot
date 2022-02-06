import { Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";

import LoginFormDialog from "../features/login/LoginFormDialog";
import useToast from "../features/toast/useToast";
import { useAppDispatch, useAppSelector } from "../store";
import { closeLoginModal } from "../store/globalSlice";

const Home = () => {
  const { toastLoading } = useToast();

  const { name, description, username, verified, isLoggedIn } = useAppSelector(
    (state) => state.userInfo
  );
  const { showLoginModal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

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

      {/* <div style={{ position: "fixed", bottom: 10, right: 10 }}>
        {isLoggedIn ? (
          <Button variant="contained" onClick={() => dispatch(clearUserInfo())}>
            logout
          </Button>
        ) : (
          <Button variant="contained" onClick={openLogin}>
            show login
          </Button>
        )}
      </div> */}

      <br />
      <br />
      <br />
      <div>
        <p>name = {name}</p>
        <p>description = {description}</p>
        <p>username = {username}</p>
        <p>isVerified = {verified.toString()}</p>
        <p>isLoggedIn = {isLoggedIn.toString()}</p>
      </div>

      <LoginFormDialog
        open={showLoginModal}
        onClose={() => dispatch(closeLoginModal())}
      />
    </div>
  );
};

export default Home;
