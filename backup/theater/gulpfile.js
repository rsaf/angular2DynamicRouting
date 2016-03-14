var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    ts = require('gulp-typescript');
//cnpm install gulp gulp-minify-css gulp-concat gulp-uglify gulp-notify gulp-rename gulp-typescript


var gameStyles = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
];

var gameScripts = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/socket.io-client/socket.io.js',
    'bower_components/velocity/velocity.min.js'
];


gulp.task('game-styles', function() {
    return gulp.src(gameStyles)
        .pipe(concat('game.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
});

//ここにwatchタスクを作る
gulp.task('game-scripts', function() {
  return gulp.src(gameScripts)
    .pipe(concat('game.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
    // .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('default',['game-styles','game-scripts']);

gulp.task('mobile',['mobile-script','mobile-watch']);

gulp.task('mobile-script', function(){
    return gulp.src('mobile/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target:'ES5',
            out: 'mobile.js'
        })) 
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});
gulp.task('mobile-watch',function(){
    //watch task
    gulp.watch(['mobile/**/*.ts'],['mobile-script']);

});

gulp.task('screen', ['screen-script', 'screen-watch']);
gulp.task('screen-script', function(){
    return gulp.src('screen/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            target:'ES5',
            out: 'screen.js'
        })) 
        // .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});
gulp.task('screen-watch',function(){
    //watch task
    gulp.watch(['screen/**/*.ts'],['screen-script']);

});







