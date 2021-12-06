/// <reference types="@fastly/js-compute" />

import React from 'react';
import indexHtml from 'dist/assets/index.html';
import { fetchAssets, wait } from 'internals/utils';
import { renderHtml } from 'internals/ssr-handler';

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

  if (url.pathname.startsWith('/client-side-fetch-example')) {
    await wait(2);
    return new Response(JSON.stringify({ some: 'data that took forever to load', more: 'keys', and: 'values' }), {
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  return new Response(await renderHtml(indexHtml, url), {
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}
