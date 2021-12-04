const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/fastly/entry.server.tsx',
    client: './src/fastly/entry.client.tsx',
  },
  optimization: {
    minimize: true,
  },
  target: 'webworker',
  output: {
    // would be nice to be able to customize this, throws if not named index
    /**
     * error: Invalid value for '<input>': No such file or directory (os error 2)
      ERROR: error during execution process:
     error: Invalid value for '<input>': No such file or directory (os error 2).

      If you believe this error is the result of a bug, please file an issue: https://github.com/fastly/cli/issues/new?labels=bug&template=bug_report.md
     */
    filename: '[name].js',
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /module\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, '.'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      URL: 'core-js/web/url',
    }),
  ],
};
