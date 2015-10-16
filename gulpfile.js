var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('connect', function(){
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: {'NODE_ENV' : 'development'}
  })
});

gulp.task('default', ['connect']);
