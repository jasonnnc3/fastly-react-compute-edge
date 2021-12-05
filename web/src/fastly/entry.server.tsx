/// <reference types="@fastly/js-compute" />

import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import indexHtml from 'dist/assets/index.html';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';

fastly.enableDebugLogging(true);

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

const CONTENT_TYPE_BY_EXTENSION = {
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  svg: 'image/svg+xml',
} as const;

function getContentType(url: URL) {
  const fileExtension = url.pathname.split('.').slice(-1)[0] as keyof typeof CONTENT_TYPE_BY_EXTENSION;
  const contentType = CONTENT_TYPE_BY_EXTENSION[fileExtension];

  if (!contentType) {
    throw new Error(`Missing content type for: ${fileExtension}`);
  }

  return contentType;
}

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

  const pageProps = await fetchProps();

  console.log('oageprops', pageProps);

  const ssrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App pageProps={pageProps} />
    </StaticRouter>
  );

  // need to do this for per path fetch endpoints eventually
  // const activeRoute = routes.find((route) =>
  //   matchPath(route.path, req.url)
  // ) || {}
  //
  // const promise = activeRoute.fetchInitialData
  //   ? activeRoute.fetchInitialData(req.path)
  //   : Promise.resolve()
  //
  // promise.then((data) => {
  //   const markup = ReactDOM.renderToString(
  //     <App serverData={data} />
  //   )

  // figure out how to persist comments with htmlwebpackplugin so dont need to replace entire element
  return new Response(
    indexHtml
      .replace(/<div id="app"><\/div>/, `<div id="app">${ssrHtml}</div>`)
      .replace(
        '<script id="__SSR_PROPS__" type="application/json"></script>',
        `<script id="__SSR_PROPS__" type="application/json">${pageProps}</script>`
      ),
    {
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
    }
  );
}

async function fetchAssets(url: URL) {
  const res = await fetch(`https://my-vite-webapp.s3.us-west-2.amazonaws.com${url.pathname}`, {
    method: 'GET',
    backend: 'web_static_s3',
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: new Headers({ 'Content-Type': getContentType(url), 'Cache-Control': 'public, max-age=31536000' }),
  });
}

async function fetchProps() {
  try {
    const res = await fetch(`https://abnormally-sterling-tiger.edgecompute.app/api/usertest`, {
      method: 'GET',
      backend: 'web_edge_api',
    });

    return await res.text();
  } catch (e) {
    console.log('errored fetching');
    return {};
  }
}
