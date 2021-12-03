import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Routes } from 'react-router';
import { Route, Link } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }) {
  if (!['HEAD', 'GET'].includes(request.method)) {
    return new Response('This method is not allowed', {
      status: 405,
    });
  }

  const url = new URL(request.url);

  if (url.pathname === '/client.entry.js') {
    return new Response("console.log('test')", {
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  return new Response(
    ReactDOMServer.renderToString(
      <StaticRouter location={url}>
        <html>
          <head>
            <title>Server Rendered App</title>
          </head>
          <body>
            <Routes>
              <Route
                path="*"
                element={
                  <>
                    <div>not found</div>
                    <Link to="/">to home</Link>
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <div>Home</div>
                    <Link to="/about">to about</Link>
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <div>About</div>
                    <Link to="/">to home</Link>
                  </>
                }
              />
            </Routes>
            <script src="/client.entry.js" />
          </body>
        </html>
      </StaticRouter>
    ),
    { status: 200, headers: new Headers({ 'Content-Type': 'text/html; charset=utf-8' }) }
  );
}
