/**
 * Module dependencies.
 */
 
var fs = require('fs')
  , path = require('path')
  , marked = require('marked');
  

/**
 * Expose `Page`.
 */

module.exports = Page;

/**
 * Initialize a new `Page`.
 *
 * `Page` represents a page in the site.
 *
 * @param {String} path
 * @api public
 */
function Page(filePath) {
  this.title = getTitle(filePath);
  this.url = sanitizeURL(filePath);
  this.updated = new Date().toString();
  if (/content\/index/.test(filePath)) {
    this.section = null;
  } else if (/index/.test(filePath)) {
    this.section = this.title;
  } else {
    this.section = getTitle(path.dirname(filePath) + '/index.md');
  }
  this.content = marked(fs.readFileSync(filePath, 'utf8'));
  this.sections = this.buildTree();
};

/**
 * Generate a section + page tree.
 *
 * @param {String} section
 * @return {Array}
 * @api private
 */
Page.prototype.buildTree = function(section) {
  section = section || '';
  var self = this;
  var tree = [];
  var items = fs.readdirSync('./content/' + section)
    .filter(function(item) {
      if (section.length) {
        return (/\.md/).test(item) && !(/^index/).test(item);
      }
      return !(/\.md/).test(item);
    });

  items.forEach(function(item, i) {
    if (!section.length) {
      tree.push({
        title: getTitle('./content/' + item + '/index.md'),
        url: sanitizeURL(item),
        pages: self.buildTree(item)
      });
      if (self.section === tree[i].title) tree[i].current = true;
    } else {
      tree.push({
        title: getTitle('./content/' + section + '/' + item),
        url: sanitizeURL(section + '/' + item)
      });
      if (self.title === tree[i].title) tree[i].current = true;
    }
  });

  return tree;
};

function getTitle(filePath) {
  var content = fs.readFileSync(filePath, 'utf8');
  return content.match(/^#([^#\n]+)$/m)[1].trim();
}

function sanitizeURL(filePath) {
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
}
