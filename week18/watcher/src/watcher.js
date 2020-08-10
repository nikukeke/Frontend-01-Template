const fsevents = require('fsevents');
// const webpack = require('webpack');
// const httpServer = require('http-server');

const { exec } = require('child_process')

exec("child_process");

const stop = fsevents.watch(__dirname, (path, flags, id) => {
    const info = fsevents.getInfo(path, flags, id);
    // console.log(info);
    console.log('webpack')
    //   stop(); // To end observation
    exec("webpack");
}); // To start observation