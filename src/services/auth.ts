import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { ILoginRequest, ILoginResponse, IUser } from '@/models/user';
import { resetStore, setAuthToken } from '@/redux/auth-slice';

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
          localStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getMe: builder.query<IUser, void>({
      query: () => 'me',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const apiError = error as { status: number }; // Cast error to your custom error type
          if (apiError?.status === 401) {
            dispatch(resetStore()); // Clear token in Redux
            localStorage.removeItem('accessToken'); // Remove token from local storage
            window.location.href = '/login'; // Redirect to login page (you may need to pass the navigate function)
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
