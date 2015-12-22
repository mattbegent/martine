// grab our gulp packages
var gulp  = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var Server = require('karma').Server;
var marked = require('gulp-marked');
var markdox = require("gulp-markdox");

gulp.task('compress', function() {
  return gulp.src('svelte.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('.'))
});

gulp.task('test', function() {
  return new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
      }).start();
});


gulp.task("docs", function(){
  gulp.src("svelte.js")
    .pipe(markdox())
    .pipe(gulp.dest("./doc"));
});

gulp.task('watch', function() {
    gulp.watch(["svelte.js"], ['compress', 'test']);
    gulp.watch(["docs.md"], ['docs']);
});

gulp.task('default', ['compress', 'test', 'docs']);