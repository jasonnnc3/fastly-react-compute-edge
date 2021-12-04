const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    client: './src/fastly/entry.client.tsx',
  },
  optimization: {
    minimize: true,
  },
  output: {
    filename: '[name].js',
    publicPath: 'https://my-vite-webapp.s3.us-west-2.amazonaws.com/',
    path: path.resolve(__dirname, 'dist'),
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, 'src', 'fastly', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'dist', 'index.html'),
          to: path.resolve(__dirname, 'src', 'ssr_template.html'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      URL: 'core-js/web/url',
    }),
  ],
};
