var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    jsmin = require('gulp-jsmin'),
    fs = require('fs');

gulp.task('scss', function () {
  return gulp.src(['scss/**/*.scss', 'scss/*.scss'])
  .pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch(['scss/**/*.scss', 'scss/*.scss'], ['scss']);
});

// DISTRIBUTIONS
// -------------
gulp.task('minify-js', function () {
  return gulp.src('dist/*.js')
  .pipe(jsmin())
  .pipe(gulp.dest('dist'));
});
gulp.task('minify-css', function () {
  return gulp.src('dist/*.css')
  .pipe(cssmin())
  .pipe(gulp.dest('dist'));
});
gulp.task('flattenManifestPath', function () {
  fs.readFile('manifest.json', 'utf8', (err, json) => {
    json = JSON.parse(json);
    json.content_scripts.forEach((script) => {
      script.css = script.css.map((csspath) => {
        return csspath.split('/').pop()
      });
      script.js = script.js.map((jspath) => {
        return jspath.split('/').pop()
      })
    }) // end: foreach
    fs.writeFile('dist/manifest.json', JSON.stringify(json), 'utf8', (err) => {
      if (err) console.error(err);
    });
  })
});
gulp.task('migrate-assets', function () {
  return gulp.src(['assets/**/**', '!assets/**/*.db'])
  .pipe(gulp.dest('dist/assets'));
});
gulp.task('migrate', ['migrate-assets'], function () {
  var usedFiles = [
    'js/**/*.js',
    'css/**/*.css',
    "bower_components/prism/themes/prism-okaidia.css",
    "bower_components/prism/plugins/line-numbers/prism-line-numbers.css",
    "bower_components/markdown-it/dist/markdown-it.min.js",
    "bower_components/prism/prism.js",
    "bower_components/prism/plugins/line-numbers/prism-line-numbers.min.js",
    'LICENSE'
  ]
  return gulp.src(usedFiles)
  .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['scss', 'migrate', 'minify-js', 'minify-css', 'flattenManifestPath']);
