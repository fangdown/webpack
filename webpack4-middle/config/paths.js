const path = require('path');

module.exports = {
  appIndex: path.resolve(__dirname, '../src/index.js'),
  appBuild: path.resolve(__dirname, '../build'),
  appSrc: path.resolve(__dirname,'../src'),
  appPackageJson: path.resolve(__dirname, '../package.json'),
  templateHtml: path.resolve(__dirname, '../public/index.html'),
  appNodeModules: path.resolve(__dirname, '../node_modules')
}