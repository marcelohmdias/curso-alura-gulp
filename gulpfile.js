'use strict';

var gulp = require( 'gulp' )
  , imagemin = require( 'gulp-imagemin' );

gulp.task( 'img', function () {
  return gulp.src( 'src/img/**/*' )
    .pipe(imagemin())
    .pipe(gulp.dest( 'dist/img' ));
});
