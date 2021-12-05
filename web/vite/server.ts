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
        usePolling: true,
        interval: 100,
      },
    },
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    try {
      const pathname = req.originalUrl;
      const template = await vite.transformIndexHtml(
        pathname,
        fs.readFileSync(path.resolve(__dirname, '..', 'fastly/template.html'), 'utf-8')
      );
      const render = (await vite.ssrLoadModule('/fastly/ssr.tsx')).render;
      const context: { url?: string } = {};
      const html = await render(template, new URL('http://localhost:3000' + pathname));

      if (context.url) {
        return res.redirect(301, context.url);
      }

      console.log(html);

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
    console.log('started at http://localhost:3000');
  })
);
