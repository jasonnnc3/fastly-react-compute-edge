/// <reference types="@fastly/js-compute" />

import React from 'react';
import indexHtml from 'dist/assets/index.html';
import { fetchAssets } from 'internals/utils';
import { renderHtml } from 'internals/ssr-handler';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }: FetchEvent) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  // url is https://slowly-aware-hog.edgecompute.app/profile
  const url = new URL(request.url);

  // not an asset, skipping if statement
  if (url.pathname.startsWith('/assets')) {
    return await fetchAssets(url);
  }

  // the full url is passed to `renderHtml`, along with the html template generated during the client side build process before deployment.
  return new Response(await renderHtml(indexHtml, url), {
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}
