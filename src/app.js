var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 路由信息（接口地址）开始 存放在./routes目录下
var index = require('./routes/index');
var users = require('./routes/users');

// 数据库初始化
const dbOpen = require('./db/index');
var dbclient = dbOpen({
  host: 'localhost',
  user: 'chyrain',
  password: '123456'
}, function (err, client, done) {
  // test
  client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log('dd client query:', err ? err.stack : res.rows[0].message) // Hello World!
  })
  dbclient = client;
});

var app = express();

// view engine setup 模板
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// var options = {
//   dotfiles: 'ignore', // 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”
//   etag: false,  // 是否启用 etag 生成
//   extensions: ['htm', 'html'], // 设置文件扩展名备份选项
//   index: 'index.html', // 发送目录索引文件，设置为 false 禁用目录索引(index.html)
//   maxAge: '1d', // 设置 Cache-Control 头的 max-age 属性
//   redirect: true, // 当路径为目录时，重定向至 “/”
//   setHeaders: function (res, path, stat) { // 设置 HTTP 头
//     res.set('x-timestamp', Date.now());
//   }
// }
// app.use(express.static(path.join(__dirname, '../public'), options));

let count = 0;
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  count++;
  console.log('Got requests:' + count + ' Time:', Date.now());
  next();
});

// 在app中注册routes: index,users 接口
app.use('/', index);
app.use('/users', users);

// /user 节点接受 GET 请求
app.get('/test', function (req, res) {
  // res.send('Got a GET request at /test');
  // test
  dbclient.query('SELECT $1::text as message', ['你好!'], (err, dbres) => {
    console.log('dd client query:', err ? err.stack : dbres.rows[0].message) // Hello World!

    res.send('Got a GET request at /test query:' + (err ? err.stack : dbres.rows[0].message));
  })
});

// /user 节点接受 DELETE 请求
app.delete('/test', function (req, res) {
  res.send('Got a DELETE request at /test');
});

// 静态文件
var options = {
  dotfiles: 'ignore', // 是否对外输出文件名以点（.）开头的文件。可选值为 “allow”、“deny” 和 “ignore”
  etag: false,  // 是否启用 etag 生成
  extensions: ['htm', 'html'], // 设置文件扩展名备份选项
  index: 'index.html', // 发送目录索引文件，设置为 false 禁用目录索引(index.html)
  maxAge: '1d', // 设置 Cache-Control 头的 max-age 属性
  redirect: true, // 当路径为目录时，重定向至 “/”
  setHeaders: function (res, path, stat) { // 设置 HTTP 头
    res.set('x-timestamp', Date.now());
  }
}
app.use(express.static(path.join(__dirname, '../public'), options));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
