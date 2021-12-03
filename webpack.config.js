const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './fastly/working.js',
  optimization: {
    minimize: true,
  },
  target: 'webworker',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'bin'),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      {
        test: /\.(txt|html)/,
        type: 'asset/source',
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '.'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // Polyfills go here.
    // Used for, e.g., any cross-platform WHATWG,
    // or core nodejs modules needed for your application.
    new webpack.ProvidePlugin({
      URL: 'core-js/web/url',
    }),
  ],
};
