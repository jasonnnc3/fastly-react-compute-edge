const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/fastly/entry.server.tsx',
  },
  optimization: {
    minimize: true,
  },
  target: 'webworker',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'bin'),
    libraryTarget: 'this',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
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
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src', 'fastly', 'index.html'),
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      URL: 'core-js/web/url',
    }),
  ],
};
