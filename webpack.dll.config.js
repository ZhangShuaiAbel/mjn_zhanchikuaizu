// webpack.dll.config.js
const webpack = require('webpack');
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清空文件夹
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩
const autoprefixer = require('autoprefixer'); // 浏览器前缀
const px2rem = require('postcss-plugin-px2rem'); // 转换px为rem
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin'); // 多线程压缩


const NODE_ENV = require('./config/config.dev.env');
const utils = require('./config/utils');

const vendors = [
  'vue', 
  'vuex', 
  'vue-router', 
  'axios'
]; // 'mcx-ui' './src/lib/rem'

module.exports = {
  entry: {
    'dll': vendors,
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new CleanWebpackPlugin(['dll']), // 清空打包文件
    new DllPlugin({
      path: path.join(__dirname, 'dll', '[name].manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}