var gulp = require('gulp');
var rev = require('gulp-rev');
var del = require('del');
var gulpMinifyCssNames = require('gulp-minify-css-names');
var gulpSequence = require('gulp-sequence')
var htmlmin = require('gulp-htmlmin');

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('clean-temp', function() {
    return del(['dist-temp']);
});

gulp.task('js', function () {
    return gulp.src(['dist-temp/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))  // write rev'd assets to build dir
        .pipe(rev.manifest({path: 'rev-manifest-js.json'}))
        .pipe(gulp.dest('dist')); // write manifest to build dir
});

gulp.task('css', function () {
    return gulp.src(['dist-temp/*.css'])
        .pipe(rev())                                            // generate files with version
        .pipe(gulp.dest('dist/css'))                            // write generated files to dist
        .pipe(rev.manifest({path: 'rev-manifest-css.json'}))    // produce manifest
        .pipe(gulp.dest('dist'));                               // write manifest to dist dir
});

gulp.task('images', function() {
    return gulp.src(['public/images/**'])
        .pipe(gulp.dest('dist/images'))
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest({path: 'rev-manifest-images.json'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-ejs', function () {
    return gulp.src(['src/server/views/**/*.ejs'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            caseSensitive: true
        }))
        .pipe(gulp.dest('dist/ejs'))
});


gulp.task('css-deps', function() {
    return gulp.src(['build/*font-awesome-custom/**/*', 'build/*bootstrap/**/*', 'build/*primer/**/*'])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-names-minify', function() {
    return gulp.src([
            'build/*.css',
            'build/*.js'
            ]
        )
        .pipe(gulpMinifyCssNames({
            prefix: 'pt-',
            postfix: ''
        }))
        .pipe(gulp.dest('dist-temp'))
});

gulp.task('minify-css-names-move-js', function() {
    return gulp.src(['dist-temp/*.js'])
        .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css-names-move-css', function() {
    return gulp.src(['dist-temp/*.css'])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css-names', gulpSequence('minify-css-names-minify', 'minify-css-names-move-js', 'minify-css-names-move-css'));

gulp.task('dependencies', ['css-deps']);

gulp.task('default', gulpSequence('clean', 'minify-css-names', ['js', 'css', 'images', 'minify-ejs', 'dependencies'], 'clean-temp'));
