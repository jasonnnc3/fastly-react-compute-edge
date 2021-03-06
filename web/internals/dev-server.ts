import fs from 'fs';
import path from 'path';
import express from 'express';

async function createServer(root = path.resolve(__dirname, '..')) {
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
      const pathname = req.originalUrl;
      let template = fs.readFileSync(path.resolve(__dirname, '..', 'internals/template.dev.html'), 'utf-8');
      template = await vite.transformIndexHtml(pathname, template);

      const { renderHtml } = await vite.ssrLoadModule('/internals/ssr-handler.tsx');
      const html = await renderHtml(template, new URL('http://localhost:3000' + pathname));

      const context: { url?: string } = {};
      if (context.url) {
        return res.redirect(301, context.url);
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      // @ts-expect-error
      console.log(e.stack);
      // @ts-expect-error
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('started at http://localhost:3000');
  })
);
