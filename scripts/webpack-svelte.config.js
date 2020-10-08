/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');

function resolvePath(dir) {
  return path.join(__dirname, '..', dir);
}

const env = process.env.NODE_ENV || 'development';
const buildFolder = env === 'development' ? 'build' : 'packages';

module.exports = {
  mode: env,
  entry: {
    app: './kitchen-sink/svelte/src/app.js',
  },
  output: {
    path: resolvePath('kitchen-sink/svelte'),
    hashDigestLength: 6,
    filename: 'js/[name].js',
    publicPath: '',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  resolve: {
    alias: {
      framework7: resolvePath(`${buildFolder}/core/`),
      'framework7-svelte': resolvePath(`${buildFolder}/svelte`),
    },
    extensions: ['.mjs', '.js', '.jsx', '.json', '.svelte'],
  },
  devtool: env === 'production' ? 'source-map' : 'eval',
  devServer: {
    hot: true,
    open: true,
    compress: true,
    contentBase: resolvePath('kitchen-sink/svelte'),
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: 1000,
    },
  },
  optimization: {
    namedModules: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
        include: [resolvePath('src'), resolvePath('build')],
      },
      {
        test: /\.svelte$/,
        loader: 'svelte-loader',
      },
      {
        test: /\.css$/,
        use: [
          env === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: resolvePath('kitchen-sink/react'),
                },
              },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    ...(env === 'production'
      ? [
          new OptimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true,
              map: { inline: false },
            },
          }),
        ]
      : []),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './kitchen-sink/svelte/src/index.html',
      inject: true,
      minify:
        env === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
    }),
  ],
};
