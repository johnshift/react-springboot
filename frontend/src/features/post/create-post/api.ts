import axios from "axios";
import { BACKEND_API_URL } from "../../../constants";
import { CreatePostRequest, CreatePostResponse } from "./types";

export const apiCreatePost = async (
  payload: CreatePostRequest,
  jwtToken: string
): Promise<CreatePostResponse> => {
  console.log("apiCreatePost jwtToken =", jwtToken);
  const { data } = await axios.post(
    `${BACKEND_API_URL}/posts`,
    { ...payload },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: jwtToken,
      },
    }
  );
  return data;
};
