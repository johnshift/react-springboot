import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserInfoSlice = {
  name: null,
  description: null,
  username: null,
  verified: false,
  isLoggedIn: false,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    afterLogin: (
      state,
      {
        payload: { name, description, username, verified },
      }: PayloadAction<AfterLoginAction>
    ) => ({
      ...state,
      name,
      description: description || "Click to edit description",
      username,
      verified,
      isLoggedIn: true,
    }),
    clearUserInfo: () => ({ ...initialState }),
  },
});

export const { afterLogin, clearUserInfo } = userInfoSlice.actions;
