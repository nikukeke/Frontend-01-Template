var path = require('path')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var utils = require('./utils')
var cwd = process.cwd()
var autoprefixer = require('autoprefixer')

module.exports = {
  output: {
    path: path.resolve(cwd, './build/'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    'zepto': 'Zepto'
  },
  resolve: {
    extensions: ['', '.js', '.less'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'bower': path.resolve(__dirname, '../bower_components/'),
      'components': path.resolve(__dirname, '../src/components'),
      'icon': path.resolve(__dirname, '../icon')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new StringReplacePlugin()
  ],
  postcss: [ autoprefixer() ],
  module: {
    loaders: utils.getLoaders()
  }
}
