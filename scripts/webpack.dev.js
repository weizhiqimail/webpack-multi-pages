const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');

module.exports = webpackMerge.merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'source-map',

  watchOptions: {
    poll: 1000,

    aggregateTimeout: 500,

    ignored: /node_modules/,
  },

  devServer: {
    allowedHosts: ['localhost'],
    port: 4400,
    compress: true,
    client: {
      logging: 'info',
    },
  },
});
