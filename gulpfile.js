var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var notify = require("gulp-notify");

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean-css');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('../app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('../app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('../app/css'));
});

gulp.task('clean', function(){
    return gulp.src('./lib')
    .pipe(clean());
});

// Minify index
gulp.task('html', function() {
  return gulp.src('../app/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('../'));
});

// JavaScript build task, removes whitespace and concatenates all files
gulp.task('scripts', function() {
	// Single entry point to browserify 
	gulp.src('../app/js/*.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production
		}))
		.pipe(gulp.dest('../build/js'))
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('../app/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('../app/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('../app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('app/js/*.js', ['jshint']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('notify', function() {
  gulp.src("../app/css/styles.css")
  .pipe(notify("Hello Gulp!"));
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

gulp.task('prebuild', gulpsync.sync(['clean']));
gulp.task('preflight',['images']);

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles']);
