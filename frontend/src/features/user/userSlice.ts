import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: UserSlice = {
  name: null,
  description: null,
  username: null,
  verified: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
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
  },
});

export const { afterLogin } = userSlice.actions;
