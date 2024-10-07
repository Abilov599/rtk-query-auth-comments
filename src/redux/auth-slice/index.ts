import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { authApi } from '@/services/auth';
import { IUser } from '@/models/user';

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuthState = { user: null, accessToken: null, refreshToken: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload: { accessToken, refreshToken } }) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      },
    );

    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setAuthToken, resetStore } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
