'use strict';

var gulp = require('gulp')
  , imagemin = require('gulp-imagemin')
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , replace = require('gulp-html-replace')
  , uglify = require('gulp-uglify')
  , cssmin = require('gulp-cssmin')
  , csslint = require('gulp-csslint')
  , less = require('gulp-less')
  , autoprefixer = require('gulp-autoprefixer')
  , usemin = require('gulp-usemin')
  , jshint = require('gulp-jshint')
  , stylish = require('jshint-stylish')
  , sync = require('browser-sync');

gulp.task('default',['copy'], function(){
  gulp.start('img', 'build');
});

gulp.task('server', function(){
  sync.init({
    server: { baseDir: 'dist' }
  });

  gulp.watch('dist/**/*').on('change',sync.reload);

  gulp.watch('dist/js/**/*.js').on('change',function(event){
    console.log('Linting ', event.path);
    gulp.src(event.path)
      .pipe(csslint())
      .pipe(csslint.reporter());
    });

  gulp.watch('src/less/**/*.less').on('change',function(event){
    var stram = gulp.src(event.path)
      .pipe(less())
      .pipe(gulp.dest('src/css/'));
    });

  gulp.watch('dist/css/**/*.css').on('change',function(event){
    console.log('Linting ', event.path);
    gulp.src(event.path)
      .pipe(jshint()).on('error', function (err) {
        console.log('LESS, erro compilação: ' + err.filename);
        console.log(err.message);
      })
      .pipe(jshint.reporter(stylish()));
    });
});

gulp.task('clean',function(){
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('copy',['clean'],function(){
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('build',function(){
  return gulp.src('src/**/*.html')
    .pipe(usemin({
      js:[uglify],
      css:[autoprefixer, cssmin]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('img',function(){
  gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js',function(){
  gulp.src([
    'src/js/**/jquery.js'
    ,'src/js/**/home.js'
    ,'src/js/**/produto.js'
  ])
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('html',function(){
  gulp.src('src/**/*.html')
    .pipe(replace({js:'js/all.js'}))
    .pipe(gulp.dest('dist'));
});
