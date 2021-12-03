import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from 'src/app';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  if (url.pathname === '/') {
    return new Response('<div>test123</div>', {
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
    });
  }

  if (url.pathname === '/react') {
    return new Response(ReactDOMServer.renderToString(<App testProp="a prop" />), {
      status: 200,
      headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
    });
  }

  return new Response('The page you requested could not be found', {
    status: 404,
  });
}
