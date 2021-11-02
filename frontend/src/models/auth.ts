export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  name: string;
};

export type LoginError = {
  message: string;
  field: "username" | "password";
};
