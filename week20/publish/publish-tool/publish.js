const http = require('http');
const querystring = require('querystring');

const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');


let packname = "./package";
// fs.stat(filename, (error, stat) => {

let redirect_uri = encodeURIComponent("http://localhost:8081/auth")
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.387d52dd38083a49&redirect_uri=${redirect_uri}&scope=read%3Auser&state=123abc`)
// const server = http.createServer((req, res) => {

//     // debugger;
//     // /auth?code=1524c2c4b6506f1f0438
//     if (req.url.match(/^\/auth/)) {
//         return auth(req, res);
//     }
//     // if (!req.url.match(/^\/$/)) {
//     //     res.writeHead(404, { 'Content-Type': 'text/plain' });
//     //     res.end('not found'); 
//     // }
//     if (!req.url.match(/^\/?/)) {
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('not found');
//         return;
//     }

    // console.log(req);
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // console.log(filename);
    // if (!filename)
    //     return;


    // let writeStream = fs.createWriteStream("../server/packages/package")
    // req.pipe(writeStream)

    // const options = {
    //     hostname: 'api.github.com',
    //     port: 443,
    //     path: `/user`,
    //     method: 'GET',
    //     headers: {
    //         Authorization: "token " + req.headers.token,
    //         'User-Agent':"toytoy-publish-server"
    //     }
    // }


    // const request = https.request(options, (response) => {
    //     // console.log('statusCode:', response.statusCode);
    //     // console.log('headers:', response.headers);

    //     response.on('data', (d) => {
    //         // process.stdout.write(d);
    //         let result = d.toString();
    //         console.log(d);


    //     });
    // });
    // request.on('error', (e) => {
    //     console.error(e);
    // });
    // request.end();

    // let writeStream = unzip.Extract({ path: '../server/public' })
    // // req.pipe(writeStream)
    // req.on('data',trunk => {
    //     writeStream.write(trunk);
    // })
    // req.on('end',trunk => {
    //     writeStream.end(trunk);
    // })
    // req.on('end', () => {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.end('okay');
    // })
// });


const server = http.createServer((request, res) => {
    console.log(request.url);
    let token = request.url.match(/token=([^&]+)/)[1];
    console.log(token)
    console.log("real publish");

    const options = {
        host: 'localhost',
        port: 8081,
        path: '/?filename=' + 'package.zip',
        method: 'POST',
        headers: {
            'token': token,
            'Content-Type': 'application/octet-stream'
        }
    };
    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

  
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });


    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    archive.directory(packname, false);

    // archive.on('end', () => {
    //     console.log('end');
    // });
    archive.finalize();


    archive.pipe(req);




    archive.on('end', () => {
        req.end();
    });
})
server.listen(8080);





// Write data to request body
// let readStream = fs.createReadStream('./cat.jpg')
// readStream.pipe(req); 



// })





