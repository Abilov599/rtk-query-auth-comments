import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { authApi } from '../../services/auth';
import { IUser } from '../../models/user';

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuthState = { user: null, accessToken: null, refreshToken: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload: { accessToken, refreshToken, ...user } }) => {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = user;
        localStorage.setItem('accessToken', accessToken);
      },
    );

    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
