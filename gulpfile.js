const gulp = require('gulp');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const remember = require('gulp-remember');
const newer = require('gulp-newer');
const gulpIgnore = require('gulp-ignore');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const removeHtmlComments = require('gulp-remove-html-comments');
const htmlmin = require('gulp-htmlmin');

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');

const del = require('del');
const path = require('path');
const {config} = require('./config/');

// Custom Gulp Tasks Config
let ts = new (require('./tasks/tasks.conf'))();

// Tasks
gulp.task(ts.clean.name, function () {
    return del(ts.dest);
});

gulp.task(ts.html.name, function () {
    return gulp.src(ts.html.src, {since: gulp.lastRun(ts.html.name)})
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(newer(ts.dest))
        .pipe(gulpIf(config.env !== "development", removeHtmlComments()))
        .pipe(gulpIf(config.env !== "development", htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.css.name, function () {
    return gulp.src(ts.css.src, {since: gulp.lastRun(ts.css.name)})
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(newer(ts.dest))
        .pipe(remember(ts.css.name))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(cleanCSS({rebase: false}))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('.')))
        .pipe(concat(ts.css.out))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.less.name, function () {
    return gulp.src(ts.less.src, {since: gulp.lastRun(ts.less.name)})
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(newer(ts.dest))
        .pipe(less())
        .pipe(remember(ts.less.name))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(cleanCSS({rebase: false}))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('./')))
        .pipe(concat(ts.less.out))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.js.name, function () {
    return browserify(ts.js.BwsSrc, {since: gulp.lastRun(ts.js.name)})
        .transform(babelify, {presets: ["env"]})
        .bundle()
        .pipe(source(ts.js.out))
        .pipe(buffer())
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(gulpIf(config.env !== "development", uglify({mangle:false})))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('./')))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.img.name, function () {
    return gulp.src(ts.img.src, {since: gulp.lastRun(ts.img.name)})
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(newer(ts.dest))
        .pipe(remember(ts.img.name))
        .pipe(gulpIf(config.env !== "development", imagemin()))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.fonts.name, function () {
    return gulp.src(ts.fonts.src, {since: gulp.lastRun(ts.fonts.name)})
        .pipe(gulpIgnore.exclude(ts.excludes))
        .pipe(newer(ts.dest))
        .pipe(remember(ts.fonts.name))
        .pipe(gulp.dest(ts.dest));
});

gulp.task(ts.build.name, gulp.series(ts.build.tasks));

gulp.task('watch', function () {
    gulp.watch(ts.html.src, gulp.series(ts.html.name));

    gulp.watch(ts.css.src, gulp.series(ts.css.name)).on('unlink', function (filepath) {
        remember.forget(ts.css.name, path.resolve(filepath));
    });

    gulp.watch(ts.less.src, gulp.series(ts.less.name)).on('unlink', function (filepath) {
        remember.forget(ts.less.name, path.resolve(filepath));
    });

    gulp.watch(ts.js.src, gulp.series(ts.js.name));

    gulp.watch(ts.img.src, gulp.series(ts.img.name)).on('unlink', function (filepath) {
        remember.forget(ts.img.name, path.resolve(filepath));
    });

    gulp.watch(ts.fonts.src, gulp.series(ts.fonts.name));
});

gulp.task(ts.serve.name, function () {
    browserSync.init({
        proxy: 'http://localhost:' + ts.serve.port + '/'
    });
    browserSync.watch(ts.dest + '/**/*.*').on('change', browserSync.reload);
});

// build PRODUCTION
gulp.task('default', gulp.series(ts.clean.name, ts.build.name));

// build DEVELOPMENT & WATCH & BROWSER-SYNC
gulp.task('dev', gulp.series(ts.clean.name, ts.build.name, gulp.parallel('watch', ts.serve.name)));
