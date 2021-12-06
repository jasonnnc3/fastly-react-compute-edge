const path = require('path');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');

module.exports = commonConfig({
  target: 'webworker',
  entry: {
    index: './internals/entry.server.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bin'),
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.ProvidePlugin({
      URL: 'core-js/web/url',
    }),
  ],
});
