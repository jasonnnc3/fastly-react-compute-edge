/// <reference types="@fastly/js-compute" />

import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import indexHtml from 'src/fastly/index.html';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';

fastly.enableDebugLogging(true);

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  // hardcoding in index.html until i figure out backends
  // https://developer.fastly.com/learning/compute/javascript/#composing-requests-and-responses
  // if (url.pathname === '/client.js') {
  //   const res = await fetch('https://my-vite-webapp.s3.us-west-2.amazonaws.com/client.js', {
  //     method: 'GET',
  //     backend: 'viteapps3',
  //   });
  //
  //   return new Response(res.text(), {
  //     status: res.status,
  //     headers: new Headers({ 'Content-Type': 'application/javascript; charset=utf-8' }),
  //   });
  // }

  const ssrHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return new Response(indexHtml.replace(/<!-- SSR_INNER_HTML -->/, ssrHtml), {
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}
