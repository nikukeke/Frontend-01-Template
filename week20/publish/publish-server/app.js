var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 

app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type:'application/octet-stream'
}));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;

// 每次都创建一个文件 尝试在publish-server里面去给server里面去添加一些文件
// 通过http请求去指定这个文件的内容
// 让publish文件去访问publish-server,再让publish-server根据publish-tool去给server添加文件