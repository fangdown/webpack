
process.env.NODE_ENV = 'dev';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const AnalyzeWebpackPlugin = require('analyze-webpack-plugin').default
const paths = require('./paths');
const webpackBase = require('./webpack.base');
// console.log('paths', paths);
module.exports = {
  devtool: 'eval-source-map',
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    // require.resolve('react-dev-utils/webpackHotDevClient'), // 这句和上面两句写法二选一
    require.resolve('./polyfills'),
    // 开发报错，将导致启动不了
    require.resolve('react-error-overlay'),
    paths.appIndex
  ],
  output: {
    path: paths.appBuild, // 开发环境这句没用，但是生成环境要用
    // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释，开发环境用
    pathinfo: true,
    // 这不是真实的文件，其仅仅是在开发环境下由 WebpackDevServer 提供的一个虚拟路径
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    rules: [
      {
        oneOf: [
          webpackBase.loadJsx,
          webpackBase.loadImg,
          webpackBase.loadFile,
          webpackBase.loadDevCommonCss,
        ]
      }
    ]
  },
  resolve: {
    alias: webpackBase.getAlias,
    extensions: webpackBase.getExtensioins,
    modules: ['node_modules', paths.appNodeModules].concat( // 设置寻找模块的先后机制
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
  },
  plugins: [
    // 该插件把模块作用域限制在 src 和 node_module 中
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]), 
    new HtmlWebpackPlugin({
      template: paths.templateHtml, // 文件模板
      filename: 'index.html' // 文件名
    }),
    // 热替换，热替换不是刷新
    new webpack.HotModuleReplacementPlugin(),
     // 区别开发模式和发布模式的全局变量
     new webpack.DefinePlugin(env.stringified),
     // 防止大小写错误
     new CaseSensitivePathsPlugin(),
     // 在 npm install 新的依赖后自动刷新
     // new WatchMissingNodeModulesPlugin(paths.appNodeModules),
     // 优化 moment.js 库的体积，https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
     new AnalyzeWebpackPlugin(), // 输入 http://localhost:3000/analyze.html 查看相应信息，从而进行优化
  ],
  // 将一些在浏览器不起作用，但是引用到的库置空
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: paths.appBuild,
    host: 'localhost',      // 默认是localhost
    port: 8080,             // 端口
    // open: true,             // 自动打开浏览器
    hot: true               // 开启热更新
  }
}