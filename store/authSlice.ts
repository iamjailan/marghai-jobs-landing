import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  hasSeenWelcome: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: "",
  hasSeenWelcome: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
    setLoginToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    setHasSeenWelcome: (state, action: PayloadAction<boolean>) => {
      state.hasSeenWelcome = action.payload;
    },
  },
});

export const { setLoggedIn, logout, setLoginToken, setHasSeenWelcome } = authSlice.actions;
export default authSlice.reducer;
