/// <reference types="@fastly/js-compute" />

import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
// @ts-ignore
import indexHtml from 'dist/index.html';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';

fastly.enableDebugLogging(true);

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

// @ts-ignore
async function handleRequest({ request }) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  // hardcoding in index.html until i figure out backends, i feel like theres a better way to do this, but it works for now
  // TODO: cache header by revision
  if (url.pathname === '/client.js') {
    const res = await fetch('https://my-vite-webapp.s3.us-west-2.amazonaws.com/client.js', {
      method: 'GET',
      backend: 'web_static_s3',
    });

    return new Response(await res.text(), {
      status: res.status,
      headers: new Headers({ 'Content-Type': 'application/javascript' }),
    });
  }

  const ssrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return new Response(indexHtml.replace(/<div id="app"><\/div>/, `<div id="app">${ssrHtml}</div>`), {
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}
