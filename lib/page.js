/**
 * Module dependencies.
 */
 
var fs = require('fs')
  , path = require('path')
  , marked = require('marked')
  , utils = require('./utils');
  

/**
 * Expose `Page`.
 */

module.exports = Page;

/**
 * Initialize a new `Page`.
 *
 * `Page` represents a page of the site.
 *
 * @param {String} filePath
 * @param {Number} id
 * @api public
 */
function Page(filePath, id) {
  this.id = id;
  this.title = utils.getTitle(filePath);
  this.url = utils.sanitizeURL(filePath);
  if (/content\/index/.test(filePath)) {
    this.section = null;
  } else if (/index/.test(filePath)) {
    this.section = this.title;
  } else {
    this.section = utils.getTitle(path.dirname(filePath) + '/index.md');
  }
  this.body = marked(fs.readFileSync(filePath, 'utf8'));
}