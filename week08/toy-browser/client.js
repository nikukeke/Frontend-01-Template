const net = require("net");
const parser = require("./parser.js");
const render = require("./render.js");
const images = require('images');

class Request {
  // 参考一下，xhr。
  // 由两部分组成。
  // open: method 和 url
  // 对我们来说一共要收集到的信息
  // method, url = host + port + path
  // Content-Type只要两边一致就可以了
  // body: key-value的结构
  // Content-Type有好几种格式、
  //      application/x-www-form-urlencoded
  //      multipart/form-data
  //      text/xml
  //      application/json
  // 目前必有的字段是Content-type和Content-Length


  // method, url = host + port + path
  // body: k/v
  // headers


  constructor(options) { // 如果是用ts。我们就可以在options上做一个复杂的类型，我们js的话类型不可控，随便传
    // 所以更倾向于在constructor把信息都收全
    // 因为理论上都是构成request的一部分
    // 然后给request存一个headers，先都拆开
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || "/";
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body)
        .map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }
    this.headers["Content-Length"] = this.bodyText.length;

  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`)
        .join('\r\n')}\r
\r
${this.bodyText}`
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser;
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString());
        })
      }
      connection.on('data', (data) => {
        parser.receive(data.toString());
        // resolve(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
        }
        // console.log(parser.statusLine);
        // console.log(parser.headers);
        connection.end();
      });
      // data可能由多个
      // http是流数据，收到data的时候根本不知道是不是一个完整的response
      // 所以一定不是 new Response(data);
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      });
    });
  }
}

class Response {

}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
        if (this.headers['Transfer-Encoding'] === 'chunked') {
          this.bodyParser = new TrunkedBodyParser()
        }
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char)
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;

    this.current = this.WAITING_LENGTH;
  }
  receiveChar(char) {
    // console.log(JSON.stringify(char));
    // console.log(this.current);
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          // console.log("////////////")
          // console.log(this.content);
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    }

    else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    }
    else if (this.current === this.READING_TRUNK) {
      // console.log(char);
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    }

    else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    }

    else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    } 
  }
}

void async function () {
  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: '/',
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "winter"
    }
  });
  let response = await request.send();
  // console.log(response);

  let dom = parser.parseHTML(response.body);
  // console.log(dom);
  console.log(JSON.stringify(dom, null, "     ")); 
  console.log("")
  let viewport = images(600, 500);
  // render(viewport, dom.children[0].children[3].children[1].children[3]);
  render(viewport, dom);
  viewport.save("viewport.jpg");
}();






/*
const net = require('net');
const client = net.createConnection({
  host: "127.0.0.1",
  port: 8088
}, () => {
  // 'connect' listener.
  console.log('connected to server!');

  let request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: '/',
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "winter"
    }
  })
  // console.log(request.toString());
  client.write(request.toString());
  // client.write('GET / HTTP/1.1\r\n');
  // client.write('Host : 127.0.0.1\r\n');
  // client.write('Content-Length: 20');
  // client.write('Content-Type : application/x-www-form-urlencoded \r\n');
  // client.write('\r\n');
  // client.write('field1=aaa&code=x%301\r\n');
  // client.write('\r\n');

  // 2、
  // client.write("POST / HTTP/1.1\r\n");
  // client.write("Content-type: application/x-www-form-urlencoded");
  // client.write("Content-Length: 20");
  // client.write('\r\n\r\n');
  // client.write("name=winter");
  // client.write('\r\n');


  // 3、
  // client.write("POST / HTTP/1.1\r\nContent-type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n\r\nname=winter");

  // 4、
  //   client.write(`
  // POST / HTTP/1.1\r
  // Content-type: application/x-www-form-urlencoded\r
  // Content-Length: 12\r
  // \r
  // name=winter`);

  // client 手工发比较费劲，自动发很方便。
  // client 你只要发这个文本，也会产生http request的效果
  // 首先，要对http有个直观的理解，它是文本协议，他不是一个二进制的。他完全是由文本，\r\n
  // 我们实现request也会用这个去作为主要的思路去实现

});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log(err);
  client.end();
});
*/