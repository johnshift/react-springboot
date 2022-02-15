import SidebarLayout from "../common/components/layouts/SidebarLayout";

import LoginFormDialog from "../features/login/LoginFormDialog";
import { useAppDispatch, useAppSelector } from "../store";
import { closeLoginModal } from "../store/globalSlice";

import CreatePost, { CreatePostProvider } from "../features/post/create-post";

import Post from "../features/post";

const Home = () => {
  const { showLoginModal } = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const rawMsg =
    "@[my lab](my-lab) i love you 🥰 🥰 🥰\n\nRemember I'm always here  ... \n\nWhenever you're ✨horny✨ \n\n👅 💦 👍";

  const reactions = [
    { emoji: "🥰", name: "John Ballesteros" },
    { emoji: "❤️", name: "Leni Robredo" },
    { emoji: "❤️", name: "Manny Pacquiao" },
    { emoji: "💓", name: "Isko Moreno" },
    { emoji: "💕", name: "Ping Lacson" },
    { emoji: "🥰", name: "R-A-S-T-A-M-A-N" },
    { emoji: "😍", name: "BBM" },
  ];

  return (
    <SidebarLayout>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>

      <Post
        body={rawMsg}
        id={0}
        name={"hanscem"}
        ts={"2022-02-12 14:01:35.919626"}
        visibility={"Public"}
        votes={71}
        reactions={reactions}
      />

      <LoginFormDialog
        open={showLoginModal}
        onClose={() => dispatch(closeLoginModal())}
      />
    </SidebarLayout>
  );
};

export default Home;
