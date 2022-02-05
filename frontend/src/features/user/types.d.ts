interface UserSlice {
  name: string;
  username: string;
  description: string;
  isVerified: boolean;
  isLoggedIn: boolean;
}

interface AfterLoginAction {
  name: string;
  username: string;
  description: string;
  isVerified: boolean;
}
