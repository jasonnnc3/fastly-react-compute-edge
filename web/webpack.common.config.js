const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function commonConfig({ entry, output, target, plugins }) {
  return {
    entry,
    output,
    target,
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash].css',
        chunkFilename: '[name]-[contenthash].css',
      }),
      ...plugins,
    ],
    mode: 'production',
    optimization: {
      minimize: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: false,
          },
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
          test: /\.module\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, '.'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  };
}

module.exports = commonConfig;
