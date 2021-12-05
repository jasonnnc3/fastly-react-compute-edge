/// <reference types="@fastly/js-compute" />

import { backendConfig } from 'fastly/index';

export async function fetchAssets(url: URL) {
  const res = await fetch(backendConfig['web_static_s3'] + url.pathname, {
    method: 'GET',
    backend: 'web_static_s3',
  });

  // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
  return new Response(await res.text(), {
    status: res.status,
    headers: new Headers({ 'Content-Type': getContentType(url), 'Cache-Control': 'public, max-age=31536000' }),
  });
}

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
