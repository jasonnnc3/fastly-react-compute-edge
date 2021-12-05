/// <reference types="@fastly/js-compute" />

export async function fetchAssets(url: URL) {
  const res = await fetch(`https://my-vite-webapp.s3.us-west-2.amazonaws.com${url.pathname}`, {
    method: 'GET',
    backend: 'web_static_s3',
  });

  // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
  return new Response(await res.text(), {
    status: res.status,
    headers: new Headers({ 'Content-Type': getContentType(url), 'Cache-Control': 'public, max-age=31536000' }),
  });
}

export async function fetchProps() {
  try {
    const res = await fetch(`https://my-json-server.typicode.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge/db`, {
      method: 'GET',
      backend: 'web_api',
    });

    // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
    return await res.text();
  } catch (e) {
    console.log('errored fetching');
    return {};
  }
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
