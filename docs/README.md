# table of contents

**note:** documentation is a work in progress

## how it works

the diagrams give a high level overview of how everything works. lets use a real world example and dive into the code, where a user visits the https://slowly-aware-hog.edgecompute.app/profile page.

### 1. initial page load (html render phase)

![initial page load diagram](./assets/initialpageload.jpg)

### 2. fetching assets

![initial page load diagram](./assets/assets.jpg)

### 3. [optional] client side data fetching after React component mount

![initial page load diagram](./assets/csdf.jpg)

## deployment

### 1. `make -j deploy`

runs `check-types` and `build` in parallel. upon completion of those make tasks, `fastly compute deploy` is ran and the changes are deployed.

### 2. `check-types`

type checking with `tsc`, to verify no typescript compile errors

### 3. `build`

there are two stages to the build phase. first the client side bundle is built. this is done first because the server side bundle needs the
generated html file output to `/dist/assets` from `webpack.client.config.js`.

At a high level, the steps are:

1. bundle client assets, send them to `/dist/assets`
2. import the generated html file from the client build (required because the assets are content hashed to allow for long term caching), and then build the server bundle with a `webworker` target.
3. once webpack is completed, the static assets from the client build (`/assets`) are uploaded to S3. this is done before before the fastly cli specific steps to ensure the assets are available after the deployment is complete.

Refer to the webpack configs for more information specific to the build process.

- [webpack.client.config.js](../web/webpack.client.config.js): for info specific to the client side entry (browser environment)
- [webpack.server.config.js](../web/webpack.server.config.js): for info specific to the server side entry (compute@edge environment)
- [webpack.common.config.js](../web/webpack.common.config.js): configuration shared between each

### 4. `npm run deploy`

once webpack is completed, and assets are uploaded to s3, the `js-compute-runtime` outputs the compiled `.wasm` file which is then uploaded to fastly via the cli. the changes will be live in ~30 seconds.

## current differences between development and production

Rather than bundle the code, execute the fastly-js-runtime, compile to wasm, and restart the local preview server on every file change, the develoment
environment uses [Vite](https://vitejs.dev/) in middleware mode. This allows the use of modern developer tooling like
hot module replacement, instant react component updates on save, and instant development server startup.

i developed a majority of this using the initial approach (takes ~15 seconds each time a change is made). contrast that to the setup with vite dev server where every change made is hot reloaded into the browser in ~50ms. much better experience. worth the sarcrifice of parity between development / production environments which will be mitigated by automated testing anyways.

There are a few changes that were needed to get this to work:

- the development environment uses what's defined in `vite.config.ts`. much less configuration required compared to webpack as it's geared towards being a zero config setup. fortunuately this means little to no additional overhead when managing multiple bundlers.
- `template.prod.html` is whats used by `webpack.client.config.js` when bundling code for production. the only difference is the removal of the vite client entry point (shared between vite and webpack) as the production entrypoint gets injected by `HtmlWebpackPlugin` in `webpack.client.config.js`.
- `template.dev.html` is used by the Vite dev server. as mentioned above, the only difference is one module script.
- have not had time to come up with a solution for fake API data in development yet. currently the logic in the `fetchFastlyBackend` function returns static JSON data when in development mode.

everything else is shared between development and production
