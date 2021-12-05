import { About } from 'src/routes/about/about';
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
    fetchProps: Index.fetchProps,
  },
  {
    path: '/about',
    element: About,
    fetchProps: About.fetchProps,
  },
] as const;
