const path = require('path');
const fs = require('fs');

// 根目录
const appDirectory = fs.realpathSync(process.cwd());

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

module.exports = {
  // 项目根目录
  appPath: resolveApp('.'),

  // 项目打包的目录
  appDist: resolveApp('dist'),
  // 打包后的 file 目录
  appDistAssets: resolveApp('dist/assets'),
  // 打包后的 style 目录
  appDistStyle: resolveApp('dist/style'),
  // 打包后的 js 目录
  appDistJs: resolveApp('dist/js'),

  // public 资源目录
  appPublic: resolveApp('public'),
  // public 目录下的 index.html 文件
  appHtml: resolveApp('public/index.html'),

  // 解析入口文件，入口文件可能是 index.js, index.jsx, index.ts, index.tsx
  appIndexJs: resolveModule(resolveApp, 'client/index.js'),
  appIndexJsx: resolveModule(resolveApp, 'client/index.jsx'),
  appIndexTs: resolveModule(resolveApp, 'client/index.ts'),
  appIndexTsx: resolveModule(resolveApp, 'client/index.tsx'),

  // 解析 env 环境变量
  dotenv: resolveApp('.env'),
  // package.json 的路径
  appPackageJson: resolveApp('package.json'),
  // client 目录
  appClient: resolveApp('client'),
  // server 目录
  appServer: resolveApp('server'),

  // node_modules 的目录路径
  appNodeModules: resolveApp('node_modules'),
  // tsconfig 的路径
  appTsConfig: resolveApp('tsconfig.json'),
  // jsconfig 的路径
  appJsConfig: resolveApp('jsconfig.json'),
  // yarn.lock 文件的路径
  yarnLockFile: resolveApp('yarn.lock'),
};

// 依据根目录，找到相对文件或相对目录
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function resolveModule(resolveFn, filePath) {
  const extension = moduleFileExtensions.find((extension) => {
    return fs.existsSync(resolveFn(`${filePath}.${extension}`));
  });

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
}
