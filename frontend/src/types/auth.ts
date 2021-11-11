export type LoginInput = {
  username: string;
  password: string;
};

export type LoginT = {
  id: number;
  name: string;
  username: string;
  email: string;
  desc: string;
};

export type LoginError = {
  message: string;
  // field: "username" | "password";
};
