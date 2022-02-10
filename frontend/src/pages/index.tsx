import { Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import SidebarLayout from "../common/components/layouts/SidebarLayout";
import { BACKEND_API_URL } from "../constants";

import LoginFormDialog from "../features/login/LoginFormDialog";
import CreatePost from "../features/post/CreatePost";
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
    <SidebarLayout>
      <CreatePost />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Home Page</h1>
      <p>BACKEND API = {BACKEND_API_URL}</p>
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
    </SidebarLayout>
  );
};

export default Home;
