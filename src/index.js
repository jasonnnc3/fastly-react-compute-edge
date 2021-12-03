import "regenerator-runtime/runtime.js";
import React from "react";
import ReactDOMServer from "react-dom/server";

const reactString = ReactDOMServer.renderToString(<div>test</div>);
const htmlString = "<div>working test</div>";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest({ request }) {
  if (!["HEAD", "GET"].includes(request.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new Response(htmlString, {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  if (url.pathname === "/react") {
    return new Response(reactString, {
      status: 200,
      headers: new Headers({ "Content-Type": "text/html; charset=utf-8" }),
    });
  }

  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
