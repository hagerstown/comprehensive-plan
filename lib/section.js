/**
 * Module dependencies.
 */

var utils = require('./utils');


/**
 * Expose `Section`.
 */

module.exports = Section;

/**
 * Initialize a new `Section`.
 *
 * `Section` represents a section of the site.
 *
 * @param {String} dirPath
 * @api public
 */
function Section(dirPath) {
  this.title = utils.getTitle(dirPath + '/index.md');
  this.url = utils.sanitizeURL(dirPath);
}