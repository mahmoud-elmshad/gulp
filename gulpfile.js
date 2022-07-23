const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const htmlmin = require("gulp-htmlmin");
var concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
function htmltask() {
  return src("project/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));
}
exports.html = htmltask;
// exports.default = htmltask;

function csstask() {
  return src("project/css/**/*.css")
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(dest("dist/assets/css"));
}

exports.css = csstask;

function jstask() {
  return src("project/js/**/*.js", { sourcemaps: true })
    .pipe(concat("all.min.js"))
    .pipe(terser())
    .pipe(dest("dist/assets/js", { sourcemaps: "." }));
}
exports.js = jstask;

function imgtask() {
  return gulp
    .src("project/pics/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
}
exports.img = imgtask;

function watchtask() {
  watch("project/js/**/*.js", jstask);
  watch("project/css/**/*.css", csstask);
  watch("project/*.html", htmltask);
}
// exports.default = series(htmltask, csstask, jstask);
// exports.default = parallel(htmltask, csstask, jstask);
exports.default = series(
  parallel(htmltask, csstask, jstask, imgtask),
  watchtask
);
