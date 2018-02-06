var gulp = require('gulp');
var sass = require('gulp-sass');

// sass for portfolio
gulp.task('weather', function (){
  return gulp
    .src('public/scss/weather.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
})

// for updating the scss after save happens
gulp.task('watch', function(){
  gulp.watch('public/scss/weather.scss', ['weather']);
  // Other watchers
})

gulp.task('default', ['portfolio']);
