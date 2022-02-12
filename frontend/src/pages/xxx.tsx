import { Box, Alert } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../constants";
import CustomAlert from "../features/toast/CustomAlert";
import { timeSince } from "../lib/timeSince";

const Center = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "grid",
      placeItems: "center",
      height: "100vh",
    }}
  >
    {children}
  </Box>
);

interface Post {
  id: number;
  created: string;
  body: string;
  owner: string;
  route: string;
  mentionIds: number[];
  voteIds: number[];
  commentIds: number[];
}

const apiGetAllPosts = async () => {
  const { data } = await axios.get<Post[]>(`${BACKEND_API_URL}/posts`, {
    headers: {
      authorization: localStorage.getItem("authorization") as string,
    },
  });

  return data;
};

const TestPage = () => {
  const { isLoading, isError, data } = useQuery<Post[]>(
    "allPosts",
    apiGetAllPosts
  );

  if (isLoading) {
    return <h1>LOADING ...</h1>;
  }

  if (isError) {
    console.log("useQuery allPosts error");
    return <h1>ERROR</h1>;
  }

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions;

  const d8 = "2022-02-06T08:34:00+00:00";

  return (
    <>
      <Box sx={{ marginBottom: 5, border: "1px solid red" }}>
        <p>created = September 02</p>
        <p>created = {d8}</p>
        <p>pretty created = {timeSince(d8)}</p>
      </Box>
      {data?.map((post) => {
        // const { created: rawCreated } = post;

        return (
          <Box sx={{ marginBottom: 5, border: "1px solid red" }} key={post.id}>
            <p>id = {post.id}</p>
            <p>created = {post.created}</p>
            <p>
              pretty created ={" "}
              {/* {new Date(rawCreated).toLocaleDateString("en-US", dateOptions)} */}
              {timeSince(post.created)}
            </p>
            <p>body = {post.body}</p>
            <p>owner = {post.owner}</p>
            <p>route = {post.route}</p>
            <p>mentionIds = {post.mentionIds}</p>
            <p>voteIds = {post.voteIds}</p>
            <p>commentIds = {post.commentIds}</p>
          </Box>
        );
      })}
    </>
  );
};

export default TestPage;
