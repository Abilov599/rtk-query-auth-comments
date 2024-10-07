import { type RouteObject } from 'react-router-dom';
import { BaseLayout } from '@/layout/base/layout';
import { HomePage } from '@/pages/home';
import { ErrorBoundary } from '@/router/utils/error-boundary';
import { CommentsPage } from '@/pages/comments';
import { CommentPage } from '@/pages/comment';
import { LoginPage } from '@/pages/login';
import { NotFound } from '@/pages/not-found';
import { ProfilePage } from '@/pages/profile';
import PrivateRoute from './utils/private-route';
import AuthRoute from './utils/auth-route';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <BaseLayout />
      </PrivateRoute>
    ),
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'comments',
        element: <CommentsPage />,
      },
      {
        path: 'comments/:id',
        element: <CommentPage />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <LoginPage />
      </AuthRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export { routes };
