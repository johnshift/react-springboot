import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserSlice = {
  name: "",
  description: "",
  username: "",
  isVerified: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    afterLogin: (
      state,
      {
        payload: { name, description, username, isVerified },
      }: PayloadAction<AfterLoginAction>
    ) => ({
      ...state,
      name,
      description,
      username,
      isVerified,
      isLoggedIn: true,
    }),
  },
});

export const { afterLogin } = userSlice.actions;
