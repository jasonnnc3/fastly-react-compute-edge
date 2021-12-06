import { PathMatch } from 'react-router';

export interface FetchSSRPropsParams {
  params: PathMatch['params'];
  pathname: string;
}

export const backendConfig = {
  web_api: 'https://my-json-server.typicode.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge',
  web_static_s3: 'https://my-vite-webapp.s3.us-west-2.amazonaws.com',
} as const;

export async function fetchFastlyBackend<Data>(backend: keyof typeof backendConfig, pathname: `${string}`) {
  const apiURL = backendConfig[backend] + pathname;

  if (process.env.NODE_ENV === 'development') {
    return await getFakeJson(pathname);
  }

  const res = await fetch(apiURL, { method: 'GET', backend });

  // TODO: stream this https://developer.fastly.com/learning/compute/javascript/#parsing-and-transforming-responses
  return JSON.parse(await res.text());
}

// TODO: Decide on how to handle fake data
async function getFakeJson(pathname: string) {
  if (pathname === '/posts') {
    return [
      {
        id: 1,
        title: 'how to do stuff',
        content: 'this is some blog content',
      },
      {
        id: 2,
        title: 'blog post 2',
        content: 'this is some blog content',
      },
      {
        id: 3,
        title: 'blog post 3',
        content: 'this is some blog content',
      },
      {
        id: 4,
        title: 'blog post 4',
        content: 'this is some blog content',
      },
      {
        id: 5,
        title: 'blog post 5',
        content: 'this is some blog content',
      },
      {
        id: 6,
        title: 'blog post 6',
        content: 'this is some blog content',
      },
    ];
  }

  if (pathname === '/profile') {
    return {
      name: 'my name',
      email: 'my@email.com',
      street: '123 fake street',
      city: 'san francisco',
      state: 'CA',
      createdAt: 'Dec 4, 2021',
    };
  }

  if (pathname.startsWith('/posts/')) {
    return {
      id: 5,
      title: 'blog post 5',
      content: 'this is some blog content',
    };
  }
}
