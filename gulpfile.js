var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('scss', function () {
  return gulp.src(['scss/**/*.scss', 'scss/*.scss'])
  .pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'));
});


gulp.task('watch', function () {
  gulp.watch(['scss/**/*.scss', 'scss/*.scss'], ['scss']);
});
