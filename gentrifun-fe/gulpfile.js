const gulp = require("gulp");
const ts = require("gulp-typescript");
const less = require("gulp-less");
const del = require("del");
const sync = require("gulp-sync")(gulp);

// pull in the project TypeScript config
const tsProject = ts.createProject("tsconfig.json");

gulp.task("delete-dist", function() {
    return del("dist");
})

gulp.task("move-html", function() {
  return gulp.src("src/**/*.html", {base: "./"})
  .pipe(gulp.dest('dist'));
});

gulp.task("compile", () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("less", () => {
    gulp.src("src/**/*.less", {base: "./"})
        .pipe(less())
        .pipe(gulp.dest("dist"));
});

gulp.task("watch", sync.sync(["delete-dist", "compile", "less", "move-html"]), () => {
    gulp.watch("src/**/*.ts", ["compile"]);
    gulp.watch("src/**/*.less", ["less"]);
    gulp.watch("src/**/*.html", ["move-html"]);
});

gulp.task("default", sync.sync(["delete-dist", "compile", "less", "move-html"]));