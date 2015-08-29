var gulp = require('gulp');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream')
var less = require('gulp-less');

// Read package info
var pkg = require('./package.json');

var files = {
    js: './assets/js/app.js',
    less: './assets/less/app.less',
    lesss: './assets/less/**/*.less',
    dest: './build'
}

/**
 * Configure browserify
 */
function getBrowserify(entry) { 
    return browserify({
        entries: [entry],
        // These params are for watchify
        cache: {}, 
        packageCache: {}
    })
}

function bundle(browserify) {
    browserify
        .bundle()
        .on('error', function(er){
            console.log(er.message);
        })
        .pipe(source('app.js'))
        .pipe(rename('app.min-'+pkg.version+'.js'))
        .pipe(gulp.dest(files.dest));
}

function bundleLess() {
    gulp.src(files.less)
        .pipe(
            less()
                .on('error', function(er){
                    console.log(er.type+': '+er.message);
                    console.log(er.filename+':'+er.line);
                })
        )
        .pipe(rename('app.min-'+pkg.version+'.css'))
        .pipe(gulp.dest(files.dest));
}

gulp.task('js', function(){
    bundle(getBrowserify());
});

gulp.task('watchjs', function(){
    var w = watchify(getBrowserify(files.js));
    
    w.on('update', function(){
        bundle(w);
        console.log('js files updated');
    });

    w.bundle().on('data', function() {});
});

gulp.task('less', function(){
    bundleLess()
});

gulp.task('watchless', function(){
    watch([files.lesss], function(){
        console.log('less files updated');
        bundleLess();
    });
});

gulp.task('default', ['watchjs', 'watchless']);