const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common.config');

module.exports = commonConfig({
  entry: {
    client: './internals/entry.client.tsx',
  },
  output: {
    filename: '[name]-[contenthash].js',
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist', 'assets'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'internals', 'template.prod.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
});
