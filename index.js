var proud = require('proud');
var badge = require('./src/badge');

if (module.parent) {
  module.exports = badge;
} else {
  var username = 'bahmutov';

  function total(counts) {
    return Object.keys(counts).reduce(function (sum, name) {
      return sum + counts[name];
    }, 0);
  }

  var filename = username + '.png';

  proud(username)
  .then(function (counts) {
    var n = total(counts);
    console.log(n + ' total downloads last month');
    return badge(username, n, filename);
  })
  .catch(console.error)
  .done(function () {
    console.log('saved', filename);
  });
}
