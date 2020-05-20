const gulp = require ('gulp');
const connect = require ('gulp-connect');
const imagemin = require ('gulp-imagemin');

function img () {
    return gulp
        .src('./src/img/**/*')
        .pipe(imagemin([ imagemin.mozjpeg({quality: 75, progressive: true}),]))
        .pipe(gulp.dest('tmp/assets/img'))
        .pipe (connect.reload());
}

function watchIMG (){
    return gulp

    .watch ("./src/img/**/*",{
        ignoreInitial:false
    }, img);
}

module.exports = {

    watchIMG
}