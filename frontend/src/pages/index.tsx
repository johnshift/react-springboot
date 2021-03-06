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
    "@[my lab](my-lab) i love you π₯° π₯° π₯°\n\nRemember I'm always here  ... \n\nWhenever you're β¨hornyβ¨ \n\nπ π¦ π";

  const rawMsg2 = "@[John Ballesteros](hanscem) you are so β¨gwapoβ¨ π₯° π₯° π₯°";

  const reactions = [
    { emoji: "π", name: "R-A-S-T-A-M-A-N", id: "rastaman" },
    { emoji: "β€οΈ", name: "Leni Robredo", id: "leni" },
    { emoji: "β€οΈ", name: "Manny Pacquiao", id: "pacquiao" },
    { emoji: "π", name: "BBM", id: "bongbong" },
    { emoji: "π₯°", name: "Demo User", id: "demo" },
    { emoji: "π", name: "Isko Moreno", id: "isko" },
    { emoji: "π₯°", name: "John Ballesteros", id: "hanscem" },
    { emoji: "π", name: "Ping Lacson", id: "ping" },
  ];
  const reactions2 = [
    { emoji: "β€οΈ", name: "Leni Robredo", id: "leni" },
    { emoji: "π₯°", name: "R-A-S-T-A-M-A-N", id: "rastaman" },
    { emoji: "π", name: "BBM", id: "bongbong" },
    { emoji: "π", name: "Ping Lacson", id: "ping" },
    { emoji: "β€οΈ", name: "Manny Pacquiao", id: "pacquiao" },
    { emoji: "π", name: "Isko Moreno", id: "isko" },
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
