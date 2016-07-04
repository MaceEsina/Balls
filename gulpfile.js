var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var jasmine = require('gulp-jasmine')

gulp.task('browserify', function() {
	gulp.src('src/index.js')
		.pipe(browserify().on('error', function(e) {
			console.log(e);
		}))
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
      livereload: true,
      open: true
    }).on('error', function(e) {
		console.log(e);
	}));
});

gulp.task('test', function() {
	gulp.src('spec/test.js')
	.pipe(jasmine())
})

gulp.task('default', ['webserver', 'uglify'], function() {
	gulp.watch('src/**', ['uglify'] );
});

