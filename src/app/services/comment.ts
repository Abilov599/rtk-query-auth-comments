import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IComment, ICommentList } from '../models/comment';

// Define a service using a base URL and expected endpoints
export const commentApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    useGetComments: builder.query<ICommentList, void>({
      query: () => 'comments',
    }),

    useGetCommentById: builder.query<IComment, number>({
      query: (id) => `comments/${id}`,
    }),

    usePostComment: builder.mutation<IComment, Omit<IComment, 'id'>>({
      query: ({ body }) => ({
        url: 'comments/add',
        method: 'POST',
        body,
      }),
    }),

    useEditComment: builder.mutation<IComment, Partial<IComment> & Pick<IComment, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),

    useDeleteComment: builder.mutation<IComment & { isDeleted: true; deletedOn: string }, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUseGetCommentByIdQuery,
  useUseGetCommentsQuery,
  useUsePostCommentMutation,
  useUseEditCommentMutation,
  useUseDeleteCommentMutation,
} = commentApi;
