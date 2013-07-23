/**
 * Module dependencies.
 */

var fs = require('fs')
  , Page = require('./page')
  , Section = require('./section');


/**
 * Expose `Site`.
 */

module.exports = Site;

/**
* Initialize a new `Site`.
*
* `Site` represents all the pages & sections of the site.
*
* @api public
*/
function Site() {
  var self = this
    , files = []
    , dirs = []
    , contentPath = './content/';
  
  this.pages = [];
  this.sections = [];
  this.updated = new Date().toString();
  
  fs.readdirSync(contentPath).forEach(function(item) {
    item = contentPath + item;
    if (/\.md/.test(item)) {
      files.push(item);
    } else {
      dirs.push(item);
      fs.readdirSync(item).forEach(function(file) {
        files.push(item + '/' + file);
      });
    }
  });
  
  files.forEach(function(file, i) {
    self.pages.push(new Page(file, i + 1));
  });
  
  dirs.forEach(function(dir) {
    self.sections.push(new Section(dir));
  });
}