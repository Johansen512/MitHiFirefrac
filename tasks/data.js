const gulp = require ('gulp')
const connect = require ('gulp-connect');

function data () {
    return gulp
            .src('./src/data/**/*')
            .pipe(gulp.dest("tmp/assets/data"))
            .pipe (connect.reload());
    
    }

    function buildDATA() {
        return gulp
                .src('./src/data/**/*')
                .pipe(gulp.dest("tmp/assets/data"))
                
        
        }


    function watchDATA (){
        return gulp
    
        .watch ("./src/data/**/*", 
        {ignoreInitial: false}, data);
    }
    
    module.exports = {
        watchDATA,
        buildDATA
       
    }