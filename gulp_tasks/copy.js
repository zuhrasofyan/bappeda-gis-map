// Copy required additional files such as fonts, assets...
const path = require('path');
const gulp = require('gulp');

const conf = require('../conf/gulp.conf');

gulp.task('fonts', fonts);

function fonts(){
  return gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
  .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
}
// function fonts(){
//    return gulp.src('bower_components/components-font-awesome/fonts/*')
//     .pipe(gulp.dest(path.join(conf.paths.tmp, '/fonts/')));

gulp.task('fontsServe', fontsServe);

function fontsServe(){
  return gulp.src('bower_components/bootstrap-sass/assets/fonts/bootstrap/*')
  .pipe(gulp.dest(path.join(conf.paths.tmp, '/fonts/')));

}