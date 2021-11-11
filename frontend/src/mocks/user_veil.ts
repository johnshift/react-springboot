import { UserT } from "../types";
import { db } from "./db";

import { getUserById } from "./users";

export const userVeils = [
  {
    id: 1,
    userId: 1,
    veilId: 6,
  },
  {
    id: 2,
    userId: 2,
    veilId: 5,
  },
  {
    id: 3,
    userId: 3,
    veilId: 4,
  },
];

export const getUserByUserVeilId = (userVeilId: number): UserT => {
  let dbUserVeil = db.userVeil.findFirst({
    where: {
      id: {
        equals: userVeilId,
      },
    },
  });

  let dbUser = db.user.findFirst({
    where: {
      id: {
        equals: dbUserVeil?.userId,
      },
    },
  });

  return getUserById(dbUser?.id as number);
};
