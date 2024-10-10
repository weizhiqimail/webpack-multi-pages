const path = require('path');

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
    filename: '[name]_[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['css-loader', 'style-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于 8KB 的图片将被转为 base64 字符串
              limit: 8192,
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 匹配字体文件
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts/', // 字体文件输出目录
            },
          },
        ],
      },
    ],
  },
  
  resolve: {
    // 自动解析文件的扩展名
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    
    // 指定模块查找路径
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },

  plugins: [...pagesConfig.plugins],
  
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割所有类型的代码
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
