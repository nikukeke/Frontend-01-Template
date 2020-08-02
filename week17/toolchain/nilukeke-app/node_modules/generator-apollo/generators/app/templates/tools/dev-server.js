var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var favicon = require('express-favicon')

var fs = require('fs')

var app = express()
var compiler = webpack(config)
// 设置资源目录
app.use('/static', express.static(path.join(__dirname, '../src')))

// app.use(favicon(path.join(__dirname, '../favicon.ico')))
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*.json', function (req, res) {
  var jsonPath = path.resolve(process.cwd(), '.' + req.path)

  if (fs.existsSync(jsonPath)) {
    fs.createReadStream(jsonPath).pipe(res)
  } else {
    res.writeHeader(404)
    res.end()
  }
})
app.post('*.json', function (req, res) {
  var jsonPath = path.resolve(process.cwd(), '.' + req.path)

  if (fs.existsSync(jsonPath)) {
    fs.createReadStream(jsonPath).pipe(res)
  } else {
    res.writeHeader(404)
    res.end()
  }
})

app.listen(8000, '127.0.0.1', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://127.0.0.1:8000')
})
