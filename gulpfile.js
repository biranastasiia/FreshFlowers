const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const server = require('gulp-server-livereload');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const clean = require('gulp-clean');
const fileSystem = require('fs');
const sourceMap = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const plumberNotify = (title) => {
    return {
            errorHandler: notify.onError({
                title: title,
                message: 'Error <%= error.message %>',
                sound: false
            })
    }
}

gulp.task('includeHTMLFiles', function () {
    return gulp
        .src('./src/index.html')
        .pipe(plumber(plumberNotify('HTML')))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('compileSCSS', function () {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(plumber(plumberNotify('SCSS')))
        .pipe(sourceMap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(groupMedia())
        .pipe(sourceMap.write())
        .pipe(gulp.dest('./dist/css/'))
})

gulp.task('compileJS', function () {
    return gulp
        .src(['./src/js/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script/'))
})

gulp.task('copyImages', function () {
    return gulp
        .src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('copyFonts', function () {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'))
})

gulp.task('webserver', function () {
    return gulp
        .src('./dist/')
        .pipe(server({
            livereload: true,
            open: true
        }))
})

gulp.task('cleanDist', function (done) {
    if (fileSystem.existsSync('./dist/')) {
        return gulp
            .src('./dist/',  {read: false})
            .pipe(clean())
    }
    done();
})

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('compileSCSS'))
    gulp.watch('./src/**/*.html', gulp.parallel('includeHTMLFiles'))
    gulp.watch('./src/images/**/*', gulp.parallel('copyImages'))
    gulp.watch('./src/js/*.js', gulp.parallel('compileJS'))
})

gulp.task('default', gulp.series(
    'cleanDist',
    gulp.parallel('includeHTMLFiles', 'compileSCSS', 'copyImages', 'copyFonts', 'compileJS'),
    gulp.parallel('webserver', 'watch')
))