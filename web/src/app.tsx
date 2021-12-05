import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import { NotFound } from 'src/routes/not-found/not-found';
import { routes } from 'src/routes';

export interface Post {
  id: number;
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
  console.log(pageProps);
  return null;
  return (
    <>
      {renderHeader()}
      <Routes>
        <Route path="*" element={<NotFound />} />
        {routes.map(({ path, element: Element }) => (
          //@ts-expect-error
          <Route path={path} element={<Element {...pageProps} />} />
        ))}
      </Routes>
    </>
  );

  function renderHeader() {
    return (
      <nav className="uk-navbar-container" uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Posts</a>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  {pageProps.posts.map((post) => (
                    <li>
                      <a href="#">{post.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
