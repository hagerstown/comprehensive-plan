/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path')
  , sys = require('sys');


exports.getTitle = function (filePath) {
  var content = fs.readFileSync(filePath, 'utf8');
  sys.puts(filePath);
  return content.match(/^#([^#\n]+)$/m)[1].trim();
};

exports.sanitizeURL = function (filePath) {
  var newPath = filePath.split(path.sep)
    .map(function(chunk) {
      return chunk.replace(/\d{2,}-?/, '')
        .replace(/\.md/, '');
    });

  if (newPath[0] === '.') newPath.shift();
  if (newPath[0] === 'content') newPath.shift();
  if (newPath[newPath.length - 1] === 'index') newPath.pop();
  newPath = newPath.join('/');
  return newPath;
};