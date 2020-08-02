var git = require('git-rev-sync')
var path = require('path')
var fs = require('fs')
var cwd = process.cwd()
var pageDir = cwd + '/src/pages'
var HtmlWebpackPlugin = require('html-webpack-plugin')
var files = fs.readdirSync(pageDir)
var Env_Conf = require('../env')
var StringReplacePlugin = require('string-replace-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _package = require('../package.json')

function getEnv () {
  var env = 'dev'
  if (process.argv.indexOf('--dev-daily') > -1) {
    env = 'dev-daily'
  } else if (process.argv.indexOf('--daily') > -1) {
    env = 'daily'
  } else if (process.argv.indexOf('--pre') > -1) {
    env = 'pre'
  } else if (process.argv.indexOf('--prod') > -1) {
    env = 'prod'
  }
  return env
}
function getProjectName () {
  return _package.name
}
function getVersion () {
  return /publish\/([\d|\.]+)/ig.exec(git.branch())[1]
}
function getReplace () {
  var env = getEnv()
  if (env === 'dev-daily') {
    env = 'daily'
  }
  return [
    {
      pattern: getPattern(),
      replacement: function (match, p1, offset, string) {
        return Env_Conf[match][env]
      }
    }
  ]
}

function getPublicPath () {
  var env = getEnv()
  var p_path = `${getProjectName()}/${getVersion()}`
  switch (env) {
    case 'daily':
      return `//assets.daily.geilicdn.com/m/${p_path}/`
    case 'pre':
      return `//assets.pre.geilicdn.com/m/${p_path}/`
    case 'prod':
      return `//assets.geilicdn.com/m/${p_path}/`
    default:
      return '/'
  }
}
function getLoaders () {
  if (getEnv() === 'dev' || getEnv() === 'dev-daily') {
    return [
      {
        test: /\.js$/,
        loader: StringReplacePlugin.replace('', {
          replacements: getReplace()
        }, 'babel!eslint'),
        // loader: 'babel!eslint',
        exclude: /node_modules|build/
      }, {
        test: /\.html$/,
        loader: 'underscore-template-loader'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
  return [
    {
      test: /\.js$/,
      loader: StringReplacePlugin.replace('', {
        replacements: getReplace()
      }, 'babel!eslint'),
      exclude: /node_modules|build/
    }, {
      test: /\.html$/,
      loader: 'underscore-template-loader'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }
  ]
}
function getPattern () {
  var matches = []
  for (var p in Env_Conf) {
    matches.push(p)
  }
  return new RegExp(matches.join('|'), 'ig')
}
module.exports = {
  getEnv,
  getPattern,
  getReplace,
  getLoaders,
  getVersion,
  getPublicPath,
  getProjectName,
  getEntry: () => {
    var entry = {}
    files.forEach((file) => {
      var state = fs.statSync(`${pageDir}/${file}`)
      if (state.isDirectory(file)) {
        var dirname = path.basename(file)
        entry[`${dirname}/index`] = [
          path.join(cwd, `/src/pages/${dirname}/index.js`)
        ]
        if (getEnv() === 'dev' || getEnv() === 'dev-daily') {
          [].concat.apply(entry[dirname + '/index'], [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?quiet=true&reload=true'])
        }
      }
    })
    return entry
  },
  getHtmlPlugins: () => {
    var plugins = []
    files.forEach((file) => {
      var state = fs.statSync(pageDir + '/' + file)
      if (state.isDirectory(file)) {
        var dirname = path.basename(file)
        plugins.push(new HtmlWebpackPlugin({
          inject: false,
          minify: {
            collapseWhitespace: getEnv() === 'dev' ? false : true,
            minifyJS: true,
            minifyCSS: true
          },
          filename: `${path.join(cwd, './build/pages/')}${dirname}/index.html`,
          template: `${path.join(cwd, './src/pages/')}${dirname}/index.html`
        }))
      }
    })
    return plugins
  }
}
