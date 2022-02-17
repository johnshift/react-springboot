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

  const rawMsg2 = "@[John Ballesteros](hanscem) you are so ✨gwapo✨ 🥰 🥰 🥰";

  const reactions = [
    { emoji: "🔞", name: "R-A-S-T-A-M-A-N", id: "rastaman" },
    { emoji: "❤️", name: "Leni Robredo", id: "leni" },
    { emoji: "❤️", name: "Manny Pacquiao", id: "pacquiao" },
    { emoji: "😍", name: "BBM", id: "bongbong" },
    { emoji: "🥰", name: "Demo User", id: "demo" },
    { emoji: "🔞", name: "Isko Moreno", id: "isko" },
    { emoji: "🥰", name: "John Ballesteros", id: "hanscem" },
    { emoji: "🔞", name: "Ping Lacson", id: "ping" },
  ];
  const reactions2 = [
    { emoji: "❤️", name: "Leni Robredo", id: "leni" },
    { emoji: "🥰", name: "R-A-S-T-A-M-A-N", id: "rastaman" },
    { emoji: "😍", name: "BBM", id: "bongbong" },
    { emoji: "🎉", name: "Ping Lacson", id: "ping" },
    { emoji: "❤️", name: "Manny Pacquiao", id: "pacquiao" },
    { emoji: "🎉", name: "Isko Moreno", id: "isko" },
  ];

  return (
    <SidebarLayout>
      <CreatePostProvider>
        <CreatePost />
      </CreatePostProvider>
      <Post
        body={rawMsg2}
        id={1}
        name={"grossgusting"}
        url={"/grossgusting"}
        ts={"2022-02-17 14:31:35.919626"}
        visibility={"Public"}
        votes={19}
        reactions={reactions2}
      />

      <Post
        body={rawMsg}
        id={0}
        name={"John Ballesteros"}
        url={"/hanscem"}
        ts={"2022-02-16 14:01:35.919626"}
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
