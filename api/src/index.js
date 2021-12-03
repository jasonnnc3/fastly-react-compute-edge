addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Get the client request.
  let req = event.request;

  // Filter requests that have unexpected methods.
  if (!["HEAD", "GET"].includes(req.method)) {
    return new Response("This method is not allowed", {
      status: 405,
    });
  }

  let url = new URL(req.url);

  if (url.pathname === "/api/usertest") {
    return new Response(
      JSON.stringify({ name: "my name", email: "test@email.com" }),
      {
        status: 200,
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
        }),
      }
    );
  }

  // Catch all other requests and return a 404.
  return new Response("The page you requested could not be found", {
    status: 404,
  });
}
