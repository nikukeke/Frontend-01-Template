[Class: `http.ClientRequest`](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_class_http_clientrequest)



```js
  // Make a request to a tunneling proxy
  const options = {
    port: 1337,
    host: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.google.com:80'
  };

  const req = http.request(options);
  req.end();
```





- [`http.createServer([options\][, requestListener])`](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_createserver_options_requestlistener)

```js
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
```



创建一个server

```js
// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```

 <img src="/Users/apollo/Documents/极客时间/课后作业/week5/截屏2020-05-11 上午11.51.58.png" alt="截屏2020-05-11 上午11.51.58" style="zoom:50%;" />

我们加的头X-Foo: bar



<img src="/Users/apollo/Documents/极客时间/课后作业/week5/截屏2020-05-11 下午12.05.24.png" alt="截屏2020-05-11 下午12.05.24" style="zoom:50%;" />



![截屏2020-05-11 下午12.12.39](/Users/apollo/Documents/极客时间/课后作业/week5/截屏2020-05-11 下午12.12.39.png)



Net

![截屏2020-05-11 下午12.30.00](/Users/apollo/Documents/极客时间/课后作业/week5/截屏2020-05-11 下午12.30.00.png)



request line

​		POST / HTTP/1.1	

​				method: (options get head post put delete trace connect)	

​				path / 路径 (类似目录的概念)

​				HTTP/1.1	固定字符串 如果客户端支持2.0可以改成HTTP/2.0

​		Host:  127.0.0.1

headers (headers后面的隔一个空行)

​		Content-Type: application/x-www-form-urlencoded			

body

​		field1=aaa&code-x%3D1



tcp是流，上面正常是流里面的文本。

![截屏2020-05-11 下午2.12.36](/Users/apollo/Documents/极客时间/课后作业/week5/截屏2020-05-11 下午2.12.36.png)



response

status line 

​	HTTP/1.1 200 OK 

​		HTTP/1.1 固定

​		200 状态码

​		OK状态

headers

​	Content-type: text/html

​	Date: Mon, 23 Dec 2019 06:46:19 GMT

​	Connection: keep-alive

​	Transfer-Encoding: chunked 

Body

​	26

​	<html><body>Hello World</body></html>

​	



​	0



状态机

