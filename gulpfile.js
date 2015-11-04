'use strict';

var gulp = require( 'gulp' )
  , imagemin = require( 'gulp-imagemin' )
  , clean = require( 'gulp-clean' );

gulp.task( 'default', [ 'copy' ], function () {
  return gulp.src( 'src/img/**/*' )
    .pipe(imagemin())
    .pipe(gulp.dest( 'dist/img' ));
});

gulp.task( 'clean', function () {
  return gulp.src( 'dist' )
    .pipe(clean());
});

gulp.task( 'copy', [ 'clean' ], function () {
  return gulp.src( 'src/**/*' )
    .pipe(gulp.dest( 'dist' ));
});
