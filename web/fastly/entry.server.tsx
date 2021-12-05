/// <reference types="@fastly/js-compute" />

import { ssr } from 'fastly/ssr';
import React from 'react';
import indexHtml from 'dist/assets/index.html';
import { fetchAssets } from 'fastly/utils';

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

  const ssrHtml = await ssr(indexHtml, url);

  // figure out how to persist comments with htmlwebpackplugin so dont need to replace entire element
  return new Response(ssrHtml, {
    status: 200,
    headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }),
  });
}
