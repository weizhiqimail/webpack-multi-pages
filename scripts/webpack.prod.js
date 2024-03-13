const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');

module.exports = webpackMerge.merge(webpackBaseConfig, {
  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
      },
    },
  },
});
