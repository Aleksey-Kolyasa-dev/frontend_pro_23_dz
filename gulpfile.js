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
const tasksConfig = new (require('./tasks/tasks.conf'))();

// Tasks
gulp.task(tasksConfig.clean.name, function () {
    return del(tasksConfig.dest);
});

gulp.task(tasksConfig.html.name, function () {
    return gulp.src(tasksConfig.html.src, {since: gulp.lastRun(tasksConfig.html.name)})
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(newer(tasksConfig.dest))
        .pipe(gulpIf(config.env !== "development", removeHtmlComments()))
        .pipe(gulpIf(config.env !== "development", htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.css.name, function () {
    return gulp.src(tasksConfig.css.src, {since: gulp.lastRun(tasksConfig.css.name)})
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(newer(tasksConfig.dest))
        .pipe(remember(tasksConfig.css.name))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(cleanCSS({rebase: false}))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('.')))
        .pipe(concat(tasksConfig.css.out))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.less.name, function () {
    return gulp.src(tasksConfig.less.src, {since: gulp.lastRun(tasksConfig.less.name)})
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(newer(tasksConfig.dest))
        .pipe(less())
        .pipe(remember(tasksConfig.less.name))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(autoprefixer())
        .pipe(cleanCSS({rebase: false}))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('./')))
        .pipe(concat(tasksConfig.less.out))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.js.name, function () {
    return browserify(tasksConfig.js.BwsSrc, {since: gulp.lastRun(tasksConfig.js.name)})
        .transform(babelify, {presets: ["env"]})
        .bundle()
        .pipe(source(tasksConfig.js.out))
        .pipe(buffer())
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(gulpIf(config.env === "development", sourcemaps.init()))
        .pipe(gulpIf(config.env !== "development", uglify({mangle:false})))
        .pipe(gulpIf(config.env === "development", sourcemaps.write('./')))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.img.name, function () {
    return gulp.src(tasksConfig.img.src, {since: gulp.lastRun(tasksConfig.img.name)})
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(newer(tasksConfig.dest))
        .pipe(remember(tasksConfig.img.name))
        .pipe(gulpIf(config.env !== "development", imagemin()))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.fonts.name, function () {
    return gulp.src(tasksConfig.fonts.src, {since: gulp.lastRun(tasksConfig.fonts.name)})
        .pipe(gulpIgnore.exclude(tasksConfig.excludes))
        .pipe(newer(tasksConfig.dest))
        .pipe(remember(tasksConfig.fonts.name))
        .pipe(gulp.dest(tasksConfig.dest));
});

gulp.task(tasksConfig.build.name, gulp.series(tasksConfig.build.tasks));

gulp.task('watch', function () {
    gulp.watch(tasksConfig.html.src, gulp.series(tasksConfig.html.name));

    gulp.watch(tasksConfig.css.src, gulp.series(tasksConfig.css.name)).on('unlink', function (filepath) {
        remember.forget(tasksConfig.css.name, path.resolve(filepath));
    });

    gulp.watch(tasksConfig.less.src, gulp.series(tasksConfig.less.name)).on('unlink', function (filepath) {
        remember.forget(tasksConfig.less.name, path.resolve(filepath));
    });

    gulp.watch(tasksConfig.js.src, gulp.series(tasksConfig.js.name));

    gulp.watch(tasksConfig.img.src, gulp.series(tasksConfig.img.name)).on('unlink', function (filepath) {
        remember.forget(tasksConfig.img.name, path.resolve(filepath));
    });

    gulp.watch(tasksConfig.fonts.src, gulp.series(tasksConfig.fonts.name));
});

gulp.task(tasksConfig.serve.name, function () {
    browserSync.init({
        proxy: 'http://localhost:' + tasksConfig.serve.port + '/'
    });
    browserSync.watch(tasksConfig.dest + '/**/*.*').on('change', browserSync.reload);
});

// build PRODUCTION
gulp.task('default', gulp.series(tasksConfig.clean.name, tasksConfig.build.name));

// build DEVELOPMENT & WATCH & BROWSER-SYNC
gulp.task('dev', gulp.series(tasksConfig.clean.name, tasksConfig.build.name, gulp.parallel('watch', tasksConfig.serve.name)));
