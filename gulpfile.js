var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var jasmine = require('gulp-jasmine')

gulp.task('browserify', function() {
	gulp.src('src/index.js')
		.pipe(browserify())
		.pipe(gulp.dest('./build'))
});

gulp.task('uglify', ['browserify'], function() {
	gulp.src('build/*.js')
		.pipe(uglify())
	    .pipe(gulp.dest('./build'));
})

gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      //livereload: true,
      open: true
    }));
});

gulp.task('test', function() {
	gulp.src('spec/test.js')
	.pipe(jasmine())
})

gulp.task('default', ['uglify', 'webserver'], function() {
	gulp.watch(['src/**','index.html', 'style.css'], ['uglify'] );
});

