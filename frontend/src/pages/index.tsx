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
    { emoji: "🥰", name: "Demo User", id: "demo" },
    { emoji: "🥰", name: "John Ballesteros", id: "hanscem" },
    { emoji: "❤️", name: "Leni Robredo", id: "leni" },
    { emoji: "❤️", name: "Manny Pacquiao", id: "pacquiao" },
    { emoji: "💓", name: "Isko Moreno", id: "isko" },
    { emoji: "💕", name: "Ping Lacson", id: "ping" },
    { emoji: "🥰", name: "R-A-S-T-A-M-A-N", id: "rastaman" },
    { emoji: "😍", name: "BBM", id: "bongbong" },
  ];

  return (
    <SidebarLayout>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>
      <Post
        body={rawMsg}
        id={0}
        name={"John Ballesteros"}
        url={"/hanscem"}
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
