import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath, PathMatch } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';
import { App } from 'src/app';
import { routes } from 'src/routes';

export async function renderHtml(template: string, url: URL) {
  // potentially render page props, if a fetch function is defined for the page
  const pageProps = await getPageProps(url.pathname);

  // nothing special here, using a combination of React / React Router to render the correct component for the given url
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App pageProps={pageProps} />
    </StaticRouter>
  );

  /**
   * now that the html has been created and rendered to a string, insert it into the response to be sent back to the users browser
   *
   * the pageProps need to be passed back to the client as well in order for the React app hydration to function correctly.
   */
  return template
    .replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`)
    .replace(
      '<script id="__SSR_PROPS__" type="application/json"></script>',
      `<script id="__SSR_PROPS__" type="application/json">${JSON.stringify(pageProps)}</script>`
    );
}

async function getPageProps(pathname: string) {
  let pathMatch: PathMatch | null;

  /**
   * iterate over the list of routes (defined here: https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge/blob/main/web/src/routes.tsx)
   *
   * the path match will be set as:
   *   {
        path: '/profile',
        element: ProfilePage,
      },
   *
   * We saw above that the ProfilePage has a `fetchSSRProps` method defined. That will be invoked here, which makes a request to the "web_api" backend at the "/profile" path.
   *
   * In cases where a `fetchSSRProps` method is not defined, or there is no path match, a stringified JSON object will be resolved.
   */
  for (const route of routes) {
    pathMatch = matchPath(route.path, pathname);

    if (pathMatch) {
      const { pathname, params } = pathMatch;
      // @ts-expect-error
      return await (route?.element?.fetchSSRProps?.({ pathname, params }) || Promise.resolve('{}'));
    }
  }

  return Promise.resolve('{}');
}
