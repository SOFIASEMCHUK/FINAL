var gulp = require('gulp')
var browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
gulp.task('sass', function(done) {
    gulp.src("sass/*.sass")
        .pipe(sass().on('error', function (e) {
            console.log(e);
        }))
        .pipe(sass())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
    done();
});
gulp.task('minify-css', () => {
    return gulp.src('css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist'));
});
gulp.task('serve', function(done) {

    browserSync.init({
        server: ""
    });

    gulp.watch("sass/*.sass", gulp.series('sass'));
    gulp.watch("sass/*.sass", gulp.series('minify-css'));
    gulp.watch("*.html").on('change', () => {
        browserSync.reload();
        done();
    });


    done();
});
gulp.task('default', gulp.series('sass', 'minify-css','serve'));