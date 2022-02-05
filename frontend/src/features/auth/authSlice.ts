import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: AuthSlice = {
  name: null,
  description: null,
  username: null,
  verified: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
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
    logout: () => ({ ...initialState }),
  },
});

export const { afterLogin, logout } = authSlice.actions;
