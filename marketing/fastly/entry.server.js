import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import indexHtml from 'fastly/index.html';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  if (url.pathname === '/client.js') {
    return new Response("console.log('todo direct to s3 backend')", {
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }),
    });
  }

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
