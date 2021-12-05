// @ts-check
import fs from 'fs';
import path from 'path';
import express from 'express';

async function createServer(root = process.cwd()) {
  const app = express();
  const vite = await require('vite').createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
    },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(
        url,
        fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8')
      );
      const { render } = await vite.ssrLoadModule('/vite/entry.server.jsx');
      const context: { url?: string } = {};

      // fetch data in dev from fake json and pass to here or something

      const appHtml = render(url, context);
      //
      // if (context.url) {
      //   // Somewhere a `<Redirect>` was rendered
      //   return res.redirect(301, context.url);
      // }

      const html = template.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      // @ts-ignore
      console.log(e.stack);
      // @ts-ignore
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
