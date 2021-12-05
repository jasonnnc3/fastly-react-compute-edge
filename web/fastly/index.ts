import { PathMatch } from 'react-router';
import axios from 'axios';

export interface FetchSSRPropsParams {
  params: PathMatch['params'];
  pathname: string;
}

export const backendConfig = {
  web_api: 'https://my-json-server.typicode.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge',
  web_static_s3: 'https://my-vite-webapp.s3.us-west-2.amazonaws.com',
} as const;

export async function fetchFastlyBackend<Data>(backend: keyof typeof backendConfig, pathname: string) {
  const apiURL = backendConfig[backend] + pathname;

  if (process.env.NODE_ENV === 'development') {
    return await getFakeJson(apiURL);
  }

  const res = await fetch(apiURL, { method: 'GET', backend });

  // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
  return JSON.parse(await res.text());
}

async function getFakeJson(apiURL: string) {
  console.log(apiURL);
  const { data } = await axios.get(apiURL);

  return JSON.parse(data);
}
