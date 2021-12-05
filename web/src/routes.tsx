import { PostPage } from 'src/routes/posts/[id].page';
import { PostsPage } from 'src/routes/posts/posts.page';
import { ProfilePage } from 'src/routes/profile/profile.page';
import { IndexPage } from 'src/routes/index/index.page';

export const routes = [
  {
    path: '/',
    element: IndexPage,
  },
  {
    path: '/profile',
    element: ProfilePage,
  },
  {
    path: '/posts',
    element: PostsPage,
  },
  {
    path: '/posts/:id',
    element: PostPage,
  },
] as const;
