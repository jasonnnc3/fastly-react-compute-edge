import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, PathMatch } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';
import { routes } from 'src/routes';

export async function renderHtml(template: string, url: URL) {
  const pageProps = await getPageProps(url.pathname);

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App pageProps={pageProps} />
    </StaticRouter>
  );

  // TODO: figure out how to persist comments with htmlwebpackplugin so dont need to replace entire element
  return template
    .replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`)
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
