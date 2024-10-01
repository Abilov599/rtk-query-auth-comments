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
    resetStore: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload: { accessToken, refreshToken } }) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;

        localStorage.setItem('accessToken', accessToken);
      },
    );

    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { resetStore } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
