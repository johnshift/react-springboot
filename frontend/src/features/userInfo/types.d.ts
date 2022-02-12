interface UserInfoSlice {
  id: number | null;
  name: string | null;
  username: string | null;
  description: string | null;
  verified: boolean;
  isLoggedIn: boolean;
}

interface AfterLoginAction {
  id: number | null;
  name: string | null;
  username: string | null;
  description: string | null;
  verified: boolean;
}
