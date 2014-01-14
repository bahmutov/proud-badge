gt.module('badge unit test');

var badge = require('../badge');
var path = require('path');
var fs = require('fs');
var filename = path.join(process.cwd(), 'foo.png');

gt.async('generate badge image', function () {
  badge('foo', 10000, filename)
  .then(function () {
    gt.ok(fs.existsSync(filename), 'image file was generated');
  })
  .finally(gt.start.bind(gt));
}, 5000);