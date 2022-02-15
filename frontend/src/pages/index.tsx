import SidebarLayout from "../common/components/layouts/SidebarLayout";

import LoginFormDialog from "../features/login/LoginFormDialog";
import { useAppDispatch, useAppSelector } from "../store";
import { closeLoginModal } from "../store/globalSlice";

import CreatePost, { CreatePostProvider } from "../features/post/create-post";

import Post from "../features/post/Post";

const Home = () => {
  const { showLoginModal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const rawMsg =
    "@[my lab](my-lab) i love you 🥰 🥰 🥰\n\nRemember I'm always here  ... \n\nWhenever you're ✨horny✨ \n\n👅 💦 👍";

  return (
    <SidebarLayout>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>

      <Post body={rawMsg} id={0} name={""} ts={""} visibility={"PUBLIC"} />

      <LoginFormDialog
        open={showLoginModal}
        onClose={() => dispatch(closeLoginModal())}
      />
    </SidebarLayout>
  );
};

export default Home;
