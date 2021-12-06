# fastly-react-compute-edge

react framework tailor-made for fastlys compute@edge serverless platform. the goal is to define a standard set of patterns
to make general purpose frontend development productive and simple (without sacrificing performance) for the most common use
cases (SaaS web applications, dynamic content for marketing pages, blog + CMS integrations, support center headless CMS, etc).

production link [here](https://slowly-aware-hog.edgecompute.app/) (503's sometimes, not sure why but just refresh)

## Running the development environment

The development environment uses [Vite](https://vitejs.dev/) in middleware mode to mimic the SSR compute@edge environment without
sacrificing the developer productivity benefits Vite provides.

To start the server:

```bash
make -j dev
```

This command installs npm modules, and starts Vite. server is accessible at `localhost:3000`.

## whats supported currently

### generally

- typescript
- react
- react router 6
- server side rendering (with data fetching from any backend defined in the `fastly.toml`)
- client side data fetching
- css modules (`.module.scss`)

### development

- hot module replacement (sub 50ms, with [Vite](https://vitejs.dev/guide/why.html))
- local compute@edge preview builds (`make -j preview`)

## whats planned

See the [tasks board](https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge/projects/1).

## how does it all work?

Refer to the [docs](https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge/tree/main/docs).

## benefits

- no web servers to manage
- infinite scalability
- serve content as quickly (and securely) as possible to users anywhere in the world using fastlys edge network
- fine-grained control over caching rules
- everything else listed [here](https://www.fastly.com/products/edge-compute/serverless)
