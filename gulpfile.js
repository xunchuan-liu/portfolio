// DEVELOPMENT
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const sync = require('browser-sync').create();

// convert sass to css
gulp.task('sass', function() {
    return gulp.src('src/scss/**/[^_]*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(sync.reload({
            stream: true
        }));
})

// automatically reload browser when files change
gulp.task('reload', function() {
    sync.init({
        server: {
            baseDir: 'src'
        }
    })
    gulp.watch('src/scss/**/*.scss').on('change', gulp.series('sass'));
    gulp.watch('src/*.html').on('change', sync.reload);
    gulp.watch('src/js/**/*.js').on('change', sync.reload);
})

// start dev server
gulp.task('dev', gulp.series('sass', 'reload'));



// PRODUCTION
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const cache = require('gulp-cache');
const del = require('del');

// minifies js and css files
gulp.task('minify:code', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))    
    .pipe(gulpIf('*.css', postcss([autoprefixer(), cssnano()])))
    .pipe(gulp.dest('dist'))
});

// minifies images and caches them
gulp.task('minify:image', function() {
    return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/img'))
})

// copy animation json over
gulp.task('copy:animation', function() {
    return gulp.src('src/animation/*.json')
        .pipe(gulp.dest('dist/animation'))
})

// copy animation assets over
gulp.task('copy:animation-images', function() {
    return gulp.src('src/animation/images/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/animation/images'))
})

// clear the cache
gulp.task('cache:clear', function() {
    return cache.clearAll();
})

// clean existing dist/ folder
gulp.task('clean:dist', function(done) {
  del.sync('dist');
  done();
})

// tasks to run for build
gulp.task('optimize', gulp.parallel('minify:code', 'minify:image', 'copy:animation', 'copy:animation-images'));
gulp.task('build', gulp.series('clean:dist', 'sass', 'optimize'));