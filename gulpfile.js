// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/img/**/*',
      imgDst = './build/img';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});
 
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    //.pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

// prodction
gulp.task('prod', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
    gulp.src(['./src/bower_components/**/*'])
      .pipe(gulp.dest('./build/bower_components'))
    gulp.src(['./src/robots.txt'])
      .pipe(gulp.dest('./build/'))
});

// Static server
gulp.task('browser-sync', ['prod'], function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

// use default task to launch BrowserSync and watch JS files
gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./src/*.html", ['htmlpage', browserSync.reload]);
    gulp.watch("./src/img/**/*", ['imagemin', browserSync.reload]);
    gulp.watch("./src/styles/*", ['styles', browserSync.reload]);
    gulp.watch("./src/scripts/*", ['scripts', browserSync.reload]);
});

/*
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
  // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });
 
  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });
});
*/
