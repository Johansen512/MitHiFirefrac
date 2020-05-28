const connect = require ('gulp-connect');
const { watchHTML, buildHTML} = require ('./tasks/html');
const { watchSCSS, buildSCSS} = require ('./tasks/scss');
const { watchJS, buildJS} = require ('./tasks/js');
const { watchIMG, buildIMG } = require ('./tasks/img');
const { watchMEDIA, buildMEDIA } = require ('./tasks/media');
const { watchDATA, buildDATA } = require ('./tasks/data');





function dev(done){

watchHTML();
watchSCSS();
watchJS ();
watchIMG ();
watchMEDIA ();
watchDATA ();
connect.server ({
    livereload: true,
    port: 3000,
    root: "tmp"
})
  done();
}

function build (done) {

  buildHTML();
  buildSCSS();
  buildJS ();
  buildIMG ();
  buildMEDIA();
  buildDATA();
  done();

}

exports.default = dev;
exports.build = build;