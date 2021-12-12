// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MessageResponse } from "../../types";

import axios, { AxiosError, AxiosResponse } from "axios";
import {
  LOGIN_URL,
  MSG_LOGIN_SUCCESSFUL,
  MSG_SOMETHING_WENT_WRONG,
} from "../../lib/constants";
import { simulateDelay } from "../../lib/simulateDelay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponse>
) {
  if (req.method && req.method.toLowerCase() !== "post") {
    res.status(500);
    return;
  }

  // NOTE: 	parse the jwt claims here so 3rd party js won't be included in bundle
  //				send only useful data into clients

  // simulate delay
  await simulateDelay();

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
        .json({ message: MSG_LOGIN_SUCCESSFUL });
    })
    .catch((err: AxiosError) => {
      if (err.response && err.response.status >= 400) {
        const status = err.response.status;
        const message = (err.response as AxiosResponse<MessageResponse>).data
          .message;
        res.status(status).json({ message });
        return;
      }

      res.status(500).json({ message: MSG_SOMETHING_WENT_WRONG });
    });
}
