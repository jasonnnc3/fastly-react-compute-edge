import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, PathMatch } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';
import { routes } from 'src/routes';

export async function ssr(indexHtml: string, url: URL) {
  const pageProps = await getPageProps(url.pathname);

  const ssrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      {/*// @ts-ignore*/}
      <App pageProps={pageProps} />
    </StaticRouter>
  );

  return indexHtml
    .replace(/<div id="app"><\/div>/, `<div id="app">${ssrHtml}</div>`)
    .replace(
      '<script id="__SSR_PROPS__" type="application/json"></script>',
      `<script id="__SSR_PROPS__" type="application/json">${JSON.stringify(pageProps)}</script>`
    );
}
async function getPageProps(pathname: string) {
  let pathMatch: PathMatch | null;

  for (const route of routes) {
    pathMatch = matchPath(route.path, pathname);

    if (pathMatch) {
      const { pathname, params } = pathMatch;
      // @ts-expect-error
      return await (route?.element?.fetchSSRProps?.({ pathname, params }) || Promise.resolve('{}'));
    }
  }
}
