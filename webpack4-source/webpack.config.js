const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer:{
    port: 3004,
    progress: true,
    contentBase: './dist',
    compress: true
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename: 'index.html',
      minify:{
        removeAttributeQuotes: true, // 去html中的引号
        collapseWhitespace: true // 压缩成一行
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  // 优化项
  optimization:{
    minimizer: [
      new OptimizeCss(), //压缩css
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            //用babel-loader 需要把es6转成es5
            presets:[
              '@babel/preset-env'
            ]
          }
        }
      },      
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: '1024',
              // publicPath:'http://cdn'
            }
          }
        ]
      }
    ]
  }
}