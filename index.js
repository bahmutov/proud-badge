var proud = require('proud');
var badge = require('./src/badge');
var check = require('check-types');
var q = require('q');
var exec = q.denodeify(require('exec'));

function total(counts) {
  return Object.keys(counts).reduce(function (sum, name) {
    return sum + counts[name];
  }, 0);
}

function checkImageMagick() {
  return exec(['convert', '--version'])
    .then(function (output) {
      check.verify.unemptyString(output, 'expected output from convert --version');
      var im = /Version: ImageMagick/;
      if (!im.test(output)) {
        throw new Error('Is ImageMagick installed? tried to fetch version, got\n' + output);
      }
    });
}

function queryThenBadge(username) {
  check.verify.unemptyString(username, 'expected username');

  var filename = username + '.png';

  return proud(username)
    .then(function (counts) {
      if (check.object(counts)) {
        check.verify.object(counts, 'missing counts object');
        var n = total(counts);
        console.log(n + ' total downloads last month');
        return badge(username, n, filename);
      } else {
        return badge(username, filename);
      }
    })
    .then(function () {
      console.log('probably saved', filename);
      return filename;
    })
    .catch(function (err) {
      console.error(err);
      console.error(err.stack);
    });
}

if (module.parent) {
  var proudBadge = function proudBadge(username) {
    return queryThenBadge(username);
  };
  proudBadge.check = checkImageMagick;
  module.exports = proudBadge;
} else {
  var username = process.argv[2] || 'bahmutov';
  console.log('generating badge for', username);
  queryThenBadge(username);
}
