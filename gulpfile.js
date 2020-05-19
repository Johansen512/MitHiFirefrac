const connect = require ('gulp-connect');
const { watchHTML} = require ('./tasks/html');
const { watchSCSS} = require ('./tasks/scss');





function dev(done){

watchHTML();
watchSCSS();
connect.server ({
    livereload: true,
    port: 3000,
    root: "tmp"
})
  done();
}

exports.default = dev;