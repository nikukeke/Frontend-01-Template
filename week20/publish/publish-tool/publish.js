const http = require('http');
const querystring = require('querystring');

const fs = require('fs');
var archiver = require('archiver');


let packname = "./package";
// fs.stat(filename, (error, stat) => {


const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
};

var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

archive.directory(packname, false);

// archive.on('end', () => {
//     console.log('end');
// });
archive.finalize();

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});


archive.pipe(req)

// Write data to request body
// let readStream = fs.createReadStream('./cat.jpg')
// readStream.pipe(req); 
archive.on('end', () => {
    req.end();
});


// })





