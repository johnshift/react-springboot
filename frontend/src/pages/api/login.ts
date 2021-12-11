// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MessageResponse } from "../../types";

import axios, { AxiosError, AxiosResponse } from "axios";
import { LOGIN_URL } from "../../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponse>
) {
  if (req.method && req.method.toLowerCase() !== "post") {
    res.status(500);
    return;
  }

  await axios
    .post(
      LOGIN_URL,
      {
        principal: req.body.principal,
        password: req.body.password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((resp) => {
      return res
        .status(200)
        .setHeader("authorization", resp.headers["authorization"])
        .json({ message: "You have successfully logged in" });
    })
    .catch((err: AxiosError) => {
      if (err.response && err.response.status >= 400) {
        const status = err.response.status;
        const message = (err.response as AxiosResponse<MessageResponse>).data
          .message;
        return res.status(status).json({ message });
      }

      return res.status(500).json({ message: "Something went wrong :(" });
    });
}
