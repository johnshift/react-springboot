// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  BACKEND_API_URL,
  MSG_SOMETHING_WENT_WRONG,
  MSG_SUCCESSFUL_LOGIN,
} from "../../lib/constants";
import { randDelay } from "../../lib/common/randDelay";
import { MessageResponseT } from "../../lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponseT>
) {
  async function apiLogin() {
    try {
      const response = await fetch(BACKEND_API_URL + "/login", {
        method: "POST",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = response.status;

      if (status !== 200) {
        // const { message } = (await response.json()) as MessageResponseT;
        // res.status(status).json({ message });
        const resp = await response.json();
        res.status(status).json({ message: resp.message });
        return;
      }

      const auth = response.headers.get("authorization");
      if (auth) {
        res.setHeader("authorization", auth);
      }
      res.status(200).json({ message: MSG_SUCCESSFUL_LOGIN });
    } catch (err) {
      res.status(500).json({ message: MSG_SOMETHING_WENT_WRONG });
    }
  }
  // 3 sec delay sample
  setTimeout(() => {
    apiLogin();
  }, randDelay(500, 3000));
}
