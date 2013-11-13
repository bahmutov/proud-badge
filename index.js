var convertVersion = require('./src/version');
var badge = require('./src/badge');

/*
convertVersion()
.then(function (output) {
  console.log('imagemagick version');
  console.log(output);
})
.catch(console.error);
*/

badge(100)
.catch(console.error)
.done();
