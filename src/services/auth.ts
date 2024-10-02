import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { setAuthToken } from '@/redux/auth-slice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/auth',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthToken(data.accessToken));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getMe: builder.query<IUser, void>({
      query: () => 'me',
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
