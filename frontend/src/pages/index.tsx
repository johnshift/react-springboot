import SidebarLayout from "../common/components/layouts/SidebarLayout";

import LoginFormDialog from "../features/login/LoginFormDialog";
import CreatePost from "../features/post/CreatePost";
import { CreatePostProvider } from "../features/post/CreatePostContext";
import { useAppDispatch, useAppSelector } from "../store";
import { closeLoginModal } from "../store/globalSlice";

import Post from "../features/post/Post";

const Home = () => {
  const { showLoginModal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const rawMsg =
    "^my lab^ i love you 🥰 🥰 🥰\n\nRemember I'm always here  ... \n\nWhenever you're ✨horny✨ \n\n👅 💦 👍";

  return (
    <SidebarLayout>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>

      <Post body={rawMsg} />

      <LoginFormDialog
        open={showLoginModal}
        onClose={() => dispatch(closeLoginModal())}
      />
    </SidebarLayout>
  );
};

export default Home;
