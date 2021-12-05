/// <reference types="@fastly/js-compute" />

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import indexHtml from 'dist/assets/index.html';
import { matchPath, PathMatch } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';
import { fetchAssets } from 'fastly/utils';
import { routes } from 'src/routes';

fastly.enableDebugLogging(true);

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }: FetchEvent) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  if (url.pathname.startsWith('/assets')) {
    return await fetchAssets(url);
  }

  const pageProps = await getPageProps(url.pathname);

  const ssrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      {/*// @ts-ignore*/}
      <App pageProps={pageProps} />
    </StaticRouter>
  );

  // figure out how to persist comments with htmlwebpackplugin so dont need to replace entire element
  return new Response(
    indexHtml
      .replace(/<div id="app"><\/div>/, `<div id="app">${ssrHtml}</div>`)
      .replace(
        '<script id="__SSR_PROPS__" type="application/json"></script>',
        `<script id="__SSR_PROPS__" type="application/json">${JSON.stringify(pageProps)}</script>`
      ),
    {
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
    }
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
