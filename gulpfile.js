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
var autoprefixer = require('gulp-autoprefixer');

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('clean', function(){
    return gulp.src('./lib')
    .pipe(clean());
});

// Minify index
gulp.task('html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./_build'));
});

// JavaScript build task, concatenates all files
gulp.task('scripts', function() {
	// Single entry point to browserify 
	gulp.src('./app/js/*.js')
		.pipe(browserify({
		  insertGlobals : true,
		  //debug : !gulp.env.production
		}))
		.pipe(gulp.dest('./_build/js'))
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('./app/css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./_build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('./app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_build/img'));
});

//Add vendor prefixes to css
gulp.task('autoprefixer', function(){
	return gulp.src('./app/scss/**/*.scss')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('./_build/css'));
});

//copy bower components to build folder
gulp.task('copy-bower', function(){
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('_build/bower_components'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('./app/js/*.js', ['jshint']);
  gulp.watch('./app/scss/**/*.scss', ['sass']);
});

gulp.task('notify', function() {
  gulp.src("./app/css/styles.css")
  .pipe(notify("Hello Gulp!"));
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

gulp.task('prebuild', gulpsync.sync(['clean']));

// Build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'images', 'autoprefixer', 'styles', 'copy-bower']);
