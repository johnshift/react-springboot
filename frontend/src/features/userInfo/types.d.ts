interface UserInfoSlice {
  name: string | null;
  username: string | null;
  description: string | null;
  verified: boolean;
  isLoggedIn: boolean;
}

interface AfterLoginAction {
  name: string | null;
  username: string | null;
  description: string | null;
  verified: boolean;
}
