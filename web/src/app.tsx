import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import { NotFound } from 'src/routes/not-found/not-found';
import { routes } from 'src/routes';

interface AppProps {
  pageProps: Record<string, unknown>;
}

export function App({ pageProps }: AppProps) {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {routes.map(({ path, element: Element }) => {
        // @ts-ignore
        return <Route path={path} element={<Element {...pageProps} />} />;
      })}
    </Routes>
  );
}
