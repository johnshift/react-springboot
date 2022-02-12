import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserInfoSlice = {
  id: null,
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
        payload: { id, name, description, username, verified },
      }: PayloadAction<AfterLoginAction>
    ) => ({
      ...state,
      id,
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
