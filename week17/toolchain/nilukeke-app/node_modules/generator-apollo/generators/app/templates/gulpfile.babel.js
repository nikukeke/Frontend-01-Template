var gulp = require("gulp"),
    del = require("del"),
    htmlmin = require("gulp-htmlmin"),
    concat = require("gulp-concat"),
    path = require("path");
    
var htmlone = require('gulp-htmlone');
var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var replace = require('gulp-replace');
var Env = require('./env');
var gulpSequence = require('gulp-sequence');

var DEV_MOD = {
    DEV: 0,
    DAILY: 1,
    PREPUB: 2,
    ONLINE: 3
};

var mode = DEV_MOD.DEV;


//删除build 目录
gulp.task("del", function() {
    del.sync('./build');
});


//处理html
gulp.task("html", function() {
  if(global.WATCH ){
    return gulp.src(['./src/pages/*/+([^\.]).html'])
        .pipe(replace(/\$__DIR__\$/g, '../../../'))
        .pipe(replace(/__DOMAIN__/g, Env[mode].domain))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build/pages/'));
    } else {
      return gulp.src(['./src/pages/*/+([^\.]).html'])
        .pipe(replace(/\$__DIR__\$/g, '../../../build/'))
        .pipe(replace(/__DOMAIN__/g, Env[mode].domain))
        .pipe(htmlone({
            keepliveSelector: '.keep',  // 不要combo的selector配置，源文档中符合这个selector的将保持原状
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build/pages/'));
    }
     
});

//watch 
gulp.task("watch",["html"], function() {
    //watch html
    function watchhtml() {
        var urls =  ["src/**/*.html"];
        gulp.watch(urls, function() {
            gulp.start("html");
        });
    }
    watchhtml();
});

//default
gulp.task("default", ["del"], function() {
    return gulp.start("js","lib", "html");
});
//default
gulp.task("htmlmin",function() {
    return gulp.start("js","lib", "html");
});

gulp.task("webpack", function() {
    var webpack_config = require('./config')[0]; 
    webpack_config.mode = Env[mode];
    const bundler = webpack(webpack_config);
    return new Promise((resolve, reject) => {
          var bundlerRunCount = 0;
          function bundle(err, stats) {
            if (err) {
              return reject(err);
            }

            if (++bundlerRunCount === (global.watch ? config.length : 1)) {
              return resolve();
            }
          }

          if (global.WATCH) {
            bundler.watch(200, bundle);
          } else {
            bundler.run(bundle);
          }
    });
});

//开发
gulp.task("dev", function() {
    mode = DEV_MOD.PREPUB;
    global.WATCH = true;
    gulp.start("start");
});
//日常
gulp.task("daily", function() {
    mode = DEV_MOD.DAILY;
    global.WATCH = false;
    gulp.start("build");
});
//预发
gulp.task("prepub", function() {
    mode = DEV_MOD.PREPUB;
    global.WATCH = false;
    gulp.start("build");
});

//线上
gulp.task("online", function() {
    mode = DEV_MOD.ONLINE;
    global.WATCH = false;
    gulp.start("build");
});

gulp.task('build', function(end){
  if( global.WATCH){
    gulpSequence('webpack', 'html', 'watch', end);
  } else {
    gulpSequence('webpack', 'html', end);
  }
})
gulp.task('start', ['build'], function() {
    global.WATCH = true;
    var webpack_config = require('./config')[0]; 

    const bundler = webpack(webpack_config);
    browserSync({
        server: {
          baseDir: 'build',
          middleware: [
            webpackDevMiddleware(bundler, {
              // IMPORTANT: dev middleware can't access config, so we should
              // provide publicPath by ourselves
              publicPath: webpack_config.output.publicPath,

              // pretty colored output
              stats: webpack_config.stats,

              hot: true,
              watchDelay: 100,
              historyApiFallback: true

              // for other settings see
              // http://webpack.github.io/docs/webpack-dev-middleware.html
            }),

            // bundler should be the same as above
            webpackHotMiddleware(bundler)
          ]
        },

        // no need to watch '*.js' here, webpack will take care of it for us,
        // including full page reloads if HMR won't work
        files: [
          'build/**/*.html'
        ]
      });
    
});
