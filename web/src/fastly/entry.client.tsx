import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'src/app';

// @ts-ignore
// const pageProps = JSON.parse(document.getElementById('__SSR_PROPS__').innerHTML);
const pageProps = {};

ReactDOM.hydrate(
  <BrowserRouter>
    <App pageProps={pageProps} />
  </BrowserRouter>,
  document.getElementById('app')
);
