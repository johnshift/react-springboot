// export const userTypes = [
//   { id: 1, name: "USER" },
//   { id: 2, name: "VEIL" },
// ];

import { UserT } from "../types";
import { db } from "./db";

export const users = [
  {
    id: 1,
    name: "John Smith",
    desc: "The typical example user",
    type: 0,
  },
  {
    id: 2,
    name: "Jane Doe",
    desc: "Always representing any unindentified woman",
    type: 0,
  },
  {
    id: 3,
    name: "Ben Affleck",
    desc: "Just your normal whispering guy",
    type: 0,
  },
  {
    id: 4,
    name: "B-A-T-M-A-N",
    desc: "Black and Bats are my favorite things",
    type: 1,
  },
  {
    id: 5,
    name: "jane-doe",
    desc: "Every unidentified woman is named after me",
    type: 1,
  },
  {
    id: 6,
    name: "jsmith",
    desc: "A really not obvious veil",
    type: 1,
  },
];

export const getUserById = (userId: number): UserT => {
  let dbUser = db.user.findFirst({
    where: {
      id: {
        equals: userId,
      },
    },
  });

  let userType: 0 | 1;
  if (dbUser?.type == 1) {
    userType = 1;
  } else {
    userType = 0;
  }

  return {
    id: dbUser?.id as number,
    name: dbUser?.name as string,
    desc: dbUser?.desc as string,
    type: userType,
  };
};
