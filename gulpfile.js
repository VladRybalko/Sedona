var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    minify = require('gulp-minify'),
    jshint = require('gulp-jshint');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});
function bsReload(done) { browserSync.reload(); done(); };

gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(plumber()) // plumber
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(concat('styles.css'))
        .pipe(rename({
            basename: "styles",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp.src('app/work/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('common.js'))
        .pipe(rename({
            basename: "common",
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});

gulp.task('views', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/less/*.less', gulp.parallel('less'));
	gulp.watch('app/work/**/*.js', gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('views'));
});

gulp.task('default', gulp.parallel('views', 'less', 'browser-sync', 'watch', 'js'));