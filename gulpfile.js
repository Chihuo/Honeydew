'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat-util');
var gulpinject = require('gulp-inject');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var del = require('del');
var tsc = require('gulp-tsc');

var paths = {
  src: 'src/',
  dist: 'dist/'
};

var jsLibs = [
  paths.dist + 'libs/jquery/jquery-2.1.4.min.js',
  paths.dist + 'libs/angularjs/angular.min.js',
  paths.dist + 'libs/angular-ui-router/angular-ui-router.min.js',
  paths.dist + 'libs/lodash/lodash.min.js',
];

var jsSourceFiles = [
  paths.dist + 'app/*/*.js',
  paths.dist + 'app/app.js',
];

var jsUnitTestFiles = [
  // paths.src + 'app/**/*.spec.js',
  // paths.src + 'app/**/*.test.js'
];

var scssSourceFiles = [
  paths.src + 'index.scss'
];

var cssFiles = [
   paths.dist + 'index.css'
];

var partials = [
  paths.src + 'app/**/*.html',
];

var generatedFiles = [
  paths.dist + '*/',
  paths.dist + '*.*',
  '!' + paths.dist + 'images/',
  '!' + paths.dist + 'scripts/'
];

gulp.task('index:copy', function () {
  return gulp
    .src(paths.src + 'index.html')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('index:inject', function () {
  var sources = gulp.src(jsLibs.concat(jsSourceFiles).concat(cssFiles), { read: false });

  return gulp
    .src(paths.dist + 'index.html')
    .pipe(gulpinject(sources, { relative: true }))
    .pipe(concat.header())
    .pipe(gulp.dest(paths.dist));
});

/** lib: copying lib file to dist. */
gulp.task('lib', function () {
  return gulp
    .src(paths.src + 'libs/**')
    .pipe(gulp.dest(paths.dist + 'libs/'));
});

/** sass: compiling index.scss file to index.css and saving it into dist. */
gulp.task('sass', function () {
  return gulp
    .src(scssSourceFiles)
    .pipe(sass())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('tsc', function () {
  return gulp
    .src([paths.src + '**/*.ts'])
    .pipe(tsc({
      "noImplicitAny": false,
      "noEmitOnError": true,
      "removeComments": false,
      "sourceMap": false,
      "target": "es5"
    }))
    .pipe(gulp.dest(paths.dist));
});

/** partials: copying html partials to dist. */
gulp.task('partials', function () {
  return gulp
    .src(partials, { base: paths.src })
    .pipe(gulp.dest(paths.dist))  ;
});

/** clean: cleaning up generated files. */
gulp.task('clean', function (next) {
  del(generatedFiles, { force: true }, next);
});

gulp.task('default', function (next) {
  runSequence(
    'lib',
    'tsc',
    'index:copy',
    'index:inject',
    'sass',
    'partials',
    next);
});
