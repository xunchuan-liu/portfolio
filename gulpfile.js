const gulp = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(sync.reload({
            stream: true
        }));
})

gulp.task('reload', function() {
    sync.init({
        server: {
            baseDir: 'src'
        }
    })
    gulp.watch('src/scss/**/*.scss').on('change', gulp.series('sass'));
    gulp.watch('src/index.html').on('change', sync.reload);
})

gulp.task('dev', gulp.series('sass', 'reload'));