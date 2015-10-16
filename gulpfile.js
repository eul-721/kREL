var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha')


gulp.task('connect', function(){
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: {'NODE_ENV' : 'development'}
    })
  .on('start', ['test']);



});

gulp.task('test',function(){
  gulp.src('tests/test.js', {read: false}).
         pipe(mocha());
})

gulp.task('watch', function(){
  gulp.watch('tests/*.js',['test']);
  gulp.watch('js/**/*.js',['test']);
})

gulp.task('default', ['connect']);
