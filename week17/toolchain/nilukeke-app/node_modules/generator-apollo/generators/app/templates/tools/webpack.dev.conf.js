var webpack = require('webpack')
var config = require('./webpack.base.conf')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var utils = require('./utils')

config.devtool = '#eval-source-map'
config.devtool = '#source-map'

config.entry = utils.getEntry()
config.output.publicPath = '/'

config.plugins = [].concat.call([], config.plugins, utils.getHtmlPlugins(), [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: 9001,
    proxy: 'http://127.0.0.1:8000/',
    logConnections: false,
    notify: false
  }, {
    reload: true
  })
])

module.exports = config
