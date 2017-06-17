const gulp = require("gulp");
const ts = require("gulp-typescript");
const less = require("gulp-less");
const del = require("del");
const sync = require("gulp-sync")(gulp);

// pull in the project TypeScript config
const tsProject = ts.createProject("tsconfig.json");

gulp.task("delete-src", function() {
    return del("src");
})

gulp.task("move-static", function() {
  return gulp.src(["ts/**/*.html", "ts/**/*.svg", "ts/**/*.css", "ts/**/*.json"], {base: "./ts"})
  .pipe(gulp.dest('src'));
});

gulp.task("compile", () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("src"));
});

gulp.task("less", () => {
    gulp.src("ts/**/*.less", {base: "./ts"})
        .pipe(less())
        .pipe(gulp.dest("src"));
});

gulp.task("default", sync.sync(["delete-src", "compile", "less", "move-static"]));