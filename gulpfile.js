const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlReplace = require('gulp-html-replace');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const sequence = require('run-sequence');
const { series } = require('gulp');

var config = {
    dist: 'dist/',
    src: 'src/',
    cssin: 'src/css/**/*.css',
    jsin: 'src/js/**/*.js',
    imgin: 'src/img/**/*.{jpg,jpeg,png,gif,PNG}',
    htmlin: 'src/*.html',
    scssin: 'src/scss/**/*.scss',
    cssout: 'dist/css',
    jsout: 'dist/js',
    imgout: 'dist/img',
    htmlout: 'dist/',
    scss: 'src/css/',
    cssoutname: 'style.css',
    jsoutname: 'script.js'

}

function style() {
    return gulp.src(config.scssin)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scss))
    .pipe(browserSync.stream());
    
}

  
function watch() {
    style();
    browserSync.init({
        server: config.src
       
    });
    gulp.watch(config.scssin, style)
    gulp.watch([config.htmlin, config.jsin]).on('change',browserSync.reload);
    
}

function css(){
    return gulp.src(config.cssin)
    .pipe(concat(config.cssoutname))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssout));
}
function js(){
    return gulp.src(config.jsin)
    .pipe(concat(config.jsoutname))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsout))
}

function img(){
    return gulp.src(config.imgin)
        .pipe(changed(config.imgout))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgout));
}
function html(){
    return gulp.src(config.htmlin)
    .pipe(htmlReplace({
        'css': 'css/style.css',
        'js': 'js/script.js'

    }))
    .pipe(htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.htmlout))
}
function clean(){
    return del(['dist']);
}

exports.clean = clean;

exports.html = html;
exports.img = img;
exports.js = js;
exports.css = css;
exports.watch = watch;
exports.style = style;

exports.build = series(clean, html, js, css, img);
