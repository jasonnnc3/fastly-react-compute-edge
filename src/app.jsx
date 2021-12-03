import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const reactString = ReactDOMServer.renderToString(<div>test</div>);
