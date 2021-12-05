// @ts-check
const fs = require('fs');
const path = require('path');
const express = require('express');

async function createServer(root = process.cwd()) {
  const app = express();
  const vite = await require('vite').createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(
        url,
        fs.readFileSync(path.resolve(__dirname, '..', 'fastly/template.html'), 'utf-8')
      );
      const render = (await vite.ssrLoadModule('/vite/entry.server.jsx')).render;
      const context = {};
      const pageProps = {};
      const appHtml = render(url, context, pageProps);

      if (context.url) {
        return res.redirect(301, context.url);
      }

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(
          template
            .replace(/<div id="app"><\/div>/, `<div id="app">${appHtml}</div>`)
            .replace(
              '<script id="__SSR_PROPS__" type="application/json"></script>',
              `<script id="__SSR_PROPS__" type="application/json">${JSON.stringify(pageProps)}</script>`
            )
        );
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  })
);
