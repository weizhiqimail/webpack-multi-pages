const paths = require('./paths');
const config = require('./config');

const pagesConfig = config.generatePagesConfig();

module.exports = {
  target: 'web',

  entry: {
    ...pagesConfig.entry,
  },

  output: {
    path: paths.appDist,
    filename: '[name]_bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
  },

  plugins: [...pagesConfig.plugins],
};
