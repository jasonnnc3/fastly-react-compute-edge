import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import { Link } from 'src/components/link/link';
import { NotFoundPage } from 'src/routes/not-found/not-found.page';
import { routes } from 'src/routes';

export interface Post {
  id: string;
  title: string;
  content: string;
}

export interface Profile {
  name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  createdAt: string;
}

interface AppProps {
  pageProps: {
    posts: Post[];
    profile: Profile;
  };
}

export function App({ pageProps }: AppProps) {
  return (
    <>
      {renderHeader()}
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        {routes.map(({ path, element: Element }) => (
          //@ts-expect-error
          <Route path={path} element={<Element {...pageProps} />} />
        ))}
      </Routes>
    </>
  );

  function renderHeader() {
    return (
      <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
