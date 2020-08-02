var webpack = require('webpack')
var config = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var utils = require('./utils')
// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
// config.output.filename = '[name].[hash].js'
// config.output.chunkFilename = '[id].[hash].js'

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false

config.entry = utils.getEntry()
config.output.path = path.resolve(process.cwd(), './build/static/')
config.output.publicPath = utils.getPublicPath()

// generate loader string to be used with extract text plugin
function generateExtractLoaders (loaders) {
  return loaders.map(function (loader) {
    return loader + '-loader' + (SOURCE_MAP ? '?sourceMap' : '')
  }).join('!')
}
config.plugins = [].concat.call([], config.plugins, utils.getHtmlPlugins(), [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  new ExtractTextPlugin('[name].css')
// new ExtractTextPlugin('[name].[hash].css'),
// generate dist index.html with correct asset hash for caching.
// you can customize output by editing /build/index.template.html
// see https://github.com/ampedandwired/html-webpack-plugin
])

module.exports = config
