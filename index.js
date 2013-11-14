var username = 'bahmutov';

var proud = require('proud');
var badge = require('./src/badge');

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
