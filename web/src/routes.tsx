import { About } from 'src/routes/about/about';
import { Index } from 'src/routes/index';

export const routes = [
  {
    path: '/',
    element: Index,
  },
  {
    path: '/about',
    element: About,
  },
];
