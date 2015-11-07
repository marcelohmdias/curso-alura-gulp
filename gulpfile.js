'use strict';

var gulp = require( 'gulp' )
  , imagemin = require( 'gulp-imagemin' )
  , clean = require( 'gulp-clean' )
  , concat = require( 'gulp-concat' )
  , replace = require( 'gulp-html-replace' )
  , uglify = require( 'gulp-uglify' )
  , cssmin = require( 'gulp-cssmin' )
  , usemin = require( 'gulp-usemin' );

gulp.task( 'default', [ 'copy' ], function () {
  gulp.start( 'img', 'build' );
});

gulp.task( 'clean', function () {
  return gulp.src( 'dist' )
    .pipe(clean());
});

gulp.task( 'copy', [ 'clean' ], function () {
  return gulp.src( 'src/**/*' )
    .pipe(gulp.dest( 'dist' ));
});

gulp.task( 'img', function () {
  gulp.src( 'src/img/**/*' )
    .pipe(imagemin())
    .pipe(gulp.dest( 'dist/img' ));
});

gulp.task( 'build', function () {
  gulp.src( 'src/**/*.html' )
    .pipe(usemin({
        'js': [ uglify ]
        , 'css': [ cssmin ]
      }))
    .pipe(gulp.dest( 'dist' ));
});

gulp.task( 'js', function () {
  gulp.src([
       'src/js/**/jquery.js'
       , 'src/js/**/home.js'
       , 'src/js/**/produto.js'
    ])
    .pipe(concat( 'all.js' ))
    .pipe(uglify())
    .pipe(gulp.dest( 'dist/js/' ));
});

gulp.task( 'html', function () {
  gulp.src( 'src/**/*.html' )
    .pipe(replace({ js: 'js/all.js' }))
    .pipe(gulp.dest( 'dist' ));
});
