var check = require('check-types');
var Q = require('q');
var dexec = require('deferred-exec');

function proudBadge(n) {
  var defer = Q.defer();

  dexec('convert -background lightblue -fill black -font Times-Bold ' +
    '-size 280x36 -gravity center label:\'proud ' + n + ' NPM downloads\' label_size_width.png')
  .done(function (stdout, stderr) {
    defer.resolve(stdout);
  })
  .fail(function (err) {
    console.error('could not get generate badge');
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

module.exports = proudBadge;
