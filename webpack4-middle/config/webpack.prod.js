
process.env.NODE_ENV = 'prod';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths')
const webpackBase = require('./webpack.base');
const cssFilename = 'static/css/[name].[contenthash:8].css';

module.exports = {
  entry: paths.appIndex,
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        oneOf: [
          webpackBase.loadJsx,
          webpackBase.loadImg,
          webpackBase.loadFile,
          webpackBase.loadProdCommonCss,
        ]
      }
    ]
  },
  resolve: {
    alias: webpackBase.getAlias,
    extensions: webpackBase.getExtensioins,
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {   // 抽离第三方插件
                test: /node_modules/,   // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor',  // 打包后的文件名，任意命名    
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: 10    
            },
            npm: { // 抽离自己写的公共代码，utils这个名字可以随意起
                chunks: 'initial',
                name: 'utils',  // 任意命名
                minSize: 0    // 只要超出0字节就生成一个新包
            }
        }
    }
  },
  plugins: [
    /**
     *  匹配删除的文件夹
     *  root 根目录
     */
    new cleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../')
    }),
    // webpackBase.insertDllReferencePlugin,
    // webpackBase.insertDllToHtml,
    new HtmlWebpackPlugin({
      template: paths.templateHtml, // 文件模板
      filename: 'index.html' // 文件名
    }),
    // 抽取所有css文件到一个指定的文件中
    new MiniCssExtractPlugin({
      filename: cssFilename
    })
  ]
}