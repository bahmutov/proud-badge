var path = require('path');
var fs = require('fs');
var proudPath = path.join(__dirname, '../index.js');
var timeLimit = 30*1000;

var badge = require('..');

gt.module('check environment');

gt.async('check tools installation', function () {
  gt.func(badge.check, 'has check function');
  badge.check()
  .then(function () {
    console.log('check environment passed');
  })
  .finally(gt.start.bind(gt));
}, timeLimit);
