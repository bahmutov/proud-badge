gt.module('downloads badge');

var path = require('path');
var fs = require('fs');
var proudPath = path.join(__dirname, '../index.js');

gt.async('downloads for jashkenas', 1, function () {
  gt.exec('node', [proudPath, 'jashkenas'], 0);
}, 10000);

gt.module('using as module');

var badge = require('..');

gt.async('downloads for jashkenas', function () {
  badge('jashkenas')
  .then(function (filename) {
    gt.string(filename, 'resolved with filename');
    gt.ok(fs.existsSync(filename), 'badge file exists');
    gt.start();
  })
  .catch(function (err) {
    gt.ok(false, 'caught error', err);
    gt.start();
  });
}, 10000);
