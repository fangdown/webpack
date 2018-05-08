
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let env = 'dev';
for(let i = 0; i < process.argv.length; i++){
  if(process.argv[i] === '--env') {
    env = process.argv[i + 1];
    break;
  }
}
const vendors = [
  'react',
  'react-router',
  'react-router-dom'
]
const fileOutput = path.join(__dirname, `../build-dll/dll-${env === 'dev'? 'dev': 'prod'}`);

const config = {
  entry: {
    vendor: vendors
  },
  output: {
    path: fileOutput,
    filename: "[name].[chunkhash:8].dll.js",
    library: "[name]_[chunkhash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: `${fileOutput}/manifest.json`,
      name: '[name]_[chunkhash]',
      context: __dirname
    })
  ]
}
if (env === 'dev') {
  config.plugins.unshift(
    new CleanWebpackPlugin([fileOutput], {root: path.join(__dirname, '../')})
  )
} else if (env === 'prod') {
  config.plugins.unshift(
    new CleanWebpackPlugin([fileOutput, 'build'], {root: path.join(__dirname, '../')})
  );
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  }))
}
module.exports = config;