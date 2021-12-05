import { Post } from 'src/routes/posts/[id]';
import { Posts } from 'src/routes/posts/posts';
import { ProfilePage } from 'src/routes/profile/profile';
import { Index } from 'src/routes/index';

export interface FastlyReactRoute {
  path: string;
  element: JSX.Element;
  fetchProps?<T>(): T;
}

export const routes = [
  {
    path: '/',
    element: Index,
  },
  {
    path: '/profile',
    element: ProfilePage,
    fetchProps: ProfilePage.fetchProps,
  },
  {
    path: '/posts',
    element: Posts,
    fetchProps: Posts.fetchProps,
  },
  {
    path: '/posts/:id',
    element: Post,
    fetchProps: Post.fetchProps,
  },
] as const;
