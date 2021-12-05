import { PathMatch } from 'react-router';

export interface FetchSSRPropsParams {
  params: PathMatch['params'];
  pathname: string;
}

export const backendConfig = {
  web_api: 'https://my-json-server.typicode.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge',
  web_static_s3: 'https://my-vite-webapp.s3.us-west-2.amazonaws.com',
};

export async function fetchFastlyBackend<Data>(backend: keyof typeof backendConfig, pathname: `${string}`) {
  const res = await fetch(backendConfig[backend] + pathname, {
    method: 'GET',
    backend,
  });

  // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
  return JSON.parse(await res.text());
}
