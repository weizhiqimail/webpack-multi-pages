const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = require('./paths');

const pageEntryList = [
  {
    name: 'pageA',
    fileName: 'index.tsx',
  },
  {
    name: 'pageB',
    fileName: 'index.tsx',
  },
];

function generatePagesConfig() {
  const htmlWebpackPluginOptions = {
    hash: true,
    // 压缩
    minify: {
      // 压缩代码，去掉所有的空白
      collapseWhitespace: true,
      // 去掉注释
      removeComments: true,
      // 去掉冗余的属性
      removeRedundantAttributes: true,
      // 如果 script 标签上有 type='text/javascript'，就去掉这个属性
      removeScriptTypeAttributes: true,
      // 如果 link 标签上有 type='text/css'，就去掉这个属性
      removeStyleLinkTypeAttributes: true,
      // 去掉标签上属性值的引号
      removeAttributeQuotes: true,
    },
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
  };

  const plugins = pageEntryList.map((pageItem) => {
    return new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: `${pageItem.name}.html`,
      chunks: [pageItem.name],
      ...htmlWebpackPluginOptions,
    });
  });

  const entry = pageEntryList.reduce((prev, curr) => {
    prev[curr.name] = path.resolve(
      __dirname,
      `../client/pages/${curr.name}/index.tsx`,
    );
    return prev;
  }, {});

  return { plugins, entry };
}

module.exports = {
  generatePagesConfig,
};
