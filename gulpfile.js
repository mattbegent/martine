// grab our gulp packages
var gulp  = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var Server = require('karma').Server;
var ts = require('gulp-typescript');
var tslint = require("gulp-tslint");
var typedoc = require("gulp-typedoc");

gulp.task('scripts', function() {

  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = tsProject.src()
        .pipe(tsProject());
  return tsResult
    //.pipe(uglify())
    //.pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('.'))
});

gulp.task('test', function() {
  return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
      }).start();
});


gulp.task("docs", function(){
    return gulp
        .src(["svelte.ts"])
        .pipe(typedoc({
            module: "amd",
            target: "es5",
            out: "docs/",
            name: "svelte",
            theme: 'minimal'
        }));
});

gulp.task('watch', function() {
    gulp.watch(["svelte.js"], ['scripts']);
});

gulp.task('default', ['scripts']);
gulp.task('init:test', ['test']);
