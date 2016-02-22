var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    typescript = require('gulp-typescript');
//cnpm install gulp gulp-minify-css gulp-concat gulp-uglify gulp-notify gulp-rename gulp-typescript
var tsProject = typescript.createProject('tsconfig.json');


var libStyles = [
    // 'bower_components/normalize-css/normalize.css',
    'bower_components/Materialize/dist/css/materialize.min.css',
    'bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css',
    'bower_components/chartist/dist/chartist.min.css',
];

var libScripts = [
    'bower_components/lodash/lodash.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/Materialize/dist/js/materialize.min.js',
    'bower_components/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js',
    'bower_components/chartist/dist/chartist.min.js',
    'bower_components/Chart.js/Chart.min.js',
    'bower_components/sparkline/dist/jquery.sparkline.min.js' // must Makefile first
    // 'bower_components/bootstrap/dist/js/bootstrap.min.js',

];

var angularScripts = [
    'node_modules/angular2/bundles/angular2-polyfills.min.js',
    'node_modules/systemjs/dist/system.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/angular2/bundles/angular2.min.js',
    "node_modules/angular2/bundles/http.min.js",
    'node_modules/angular2/bundles/router.min.js',
]

// Lib
gulp.task('lib-styles', function() {
    return gulp.src(libStyles).pipe(concat('lib.min.css')).pipe(minifyCss()).pipe(gulp.dest('dist/css'))
});
gulp.task('lib-scripts', function() {
    return gulp.src(libScripts).pipe(concat('lib.min.js')).pipe(gulp.dest('dist/js'))
});
gulp.task('angular', function(){
    return gulp.src(angularScripts).pipe(concat('angular.min.js')).pipe(gulp.dest('dist/js'));
});
gulp.task('default',['lib-styles','lib-scripts','angular']);


// shop frontend
gulp.task('shop',['shop-scripts','shop-watch']);
gulp.task('shop-scripts', function(){
    return gulp.src('shop/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target:'ES5',
            out: 'shop.js'
        }))
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});
gulp.task('shop-watch',function(){
    gulp.watch(['shop/**/*.ts'],['shop-scripts']);
});

// backend admin
// admin

gulp.task('admin-script', function(){
    return gulp.src('dist/admin/**/*.ts')
        .pipe(typescript(tsProject))
       // .pipe(uglify())
        .pipe(gulp.dest('dist/admin'))
});
gulp.task('admin-watch',function(){
    //watch task
    gulp.watch(['dist/admin/**/*.ts'],['admin-script']);

});

gulp.task('admin',['admin-script','admin-watch']);
