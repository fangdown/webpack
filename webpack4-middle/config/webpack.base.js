const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');
console.log('env', process.env.NODE_ENV);
const dllFilePath = path.join(__dirname, `../build-dll/dll-${process.env.NODE_ENV === 'dev'? 'dev' : 'prod'}`);
module.exports = {
  loaderEslint: {
    test: /\.(js|jsx)$/,
      enforce: 'pre',
      use: [
        {
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),

          },
          loader: require.resolve('eslint-loader'),
        },
      ],
      include: paths.appSrc,
  },
    loadJsx: {
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: paths.appSrc,
      exclude: /node_modules/,
      // options: {
      //   compact: true,
      //   plugins: [
      //     ['import', { libraryName: 'antd', style: true }],
      //   ],
      // },
    },
    loadImg: {
      test: /\.(jpe?g|png|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/images/[name].[hash:8].[ext]',
            publicPath: '/'
          }
        }
      ],
    },
    loadFile: {
      exclude: [/\.js$/, /\.html$/, /\.less$/, /.css$/, /\.json$/],
      loader: require.resolve('file-loader'),
      options: {
        name: 'static/images/[name].[hash:8].[ext]',
        publicPath: '/',
      },
    },
    loadDevCommonCss: {
      test: /\.css$/,
      use: [
        {
          loader: require.resolve('style-loader'),
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ],
    },
    loadProdCommonCss:{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1
          }
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ],
    },
    getAlias: {
      '@src': paths.appSrc,
      '@common': path.resolve(paths.appSrc, 'common'),
    },
    getExtensioins:['.js', '.jsx', '.json', '.css', '.less'],
  insertDllReferencePlugin: new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: `${dllFilePath}/manifest.json`
  }),
  insertDllToHtml: new AddAssetHtmlPlugin({
    filepath: `${dllFilePath}/*.dll.js`,
    // 默认为true。 当设置为true时，add-asset-html-plugin 会查找js的sourceMap文件
    includeSourcemap: false , 
    publicPath: 'static/js-dll',
    outputPath: 'static/js-dll'
  })
}