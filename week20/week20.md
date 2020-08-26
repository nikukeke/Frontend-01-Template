

项目有bug，没调试好

publish-tool
浏览器
https://github.com/login/oauth/authorize?client_id=Iv1.387d52dd38083a49&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%3Auser&state=123abc


client_id=Iv1.387d52dd38083a49
&redirect_uri=http%3A%2F%2Flocalhost%3A8000
&scope=read%3Auser
&state=123abc

http://localhost:8000/?code=8551fe5ba334f777bf52&state=123abc


encodeURIComponent("http://localhost:8000")


publish-server
服务器端
{
    let code = "456af1792002df0a63ff";
    let state = "abc123"
    let client_secret = "bc1117764c62b7dd63d35a8d173dbb49a21a45b2"
    let client_id = "Iv1.387d52dd38083a49";
    let redirect_uri = encodeURIComponent("http://localhost:8000")


    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    let xhr = new XMLHttpRequest;
    
    xhr.open("POST",`https://github.com/login/oauth/access_token?${params}`, true);
    
    xhr.send(null);
    
    xhr.addEventListener("readystate",function(event){
        if(xhr.readystate === 4) {
            debugger;
            console.log(xhr.responseText)
        }
    })
}

73b4c0ef1acca3a392eae4af54a491de47c5a93b

https://developer.github.com/v3/
api.github.com/user

Authorization: token 
publish-tool  /  publish-server
客户端/服务端
{
    let xhr = new XMLHttpRequest;

    xhr.open("GET",`https://api.github.com/user`, true);
    xhr.setRequestHeader("Authorization","token 73b4c0ef1acca3a392eae4af54a491de47c5a93b")
    xhr.send(null);
    
    xhr.addEventListener("readystatechange",function(event){
        if(xhr.readyState === 4) { 
            console.log(xhr.responseText)
        }
    })
}
    

Jslint 检查js的风格

PhantomJS检查最终渲染出来的结果





oAuth

现在就是要用 github 的 api 做一个 OAuth 登录认证



## 参考链接：

- PhantomJS 下载地址：[ https://phantomjs.org/download ](https://phantomjs.org/download)
- [https://developer.github.com/v3/ ](https://developer.github.com/v3/)
- OAuth：[ https://justauth.wiki/#/quickstart/oauth](https://justauth.wiki/#/quickstart/oauth)