/**
 * Module dependencies.
 */

var ejs = require('ejs')
  , moment = require('moment');

/**
 * EJS Date filter.
 * 
 * Convert Date `str` to specified `format`.
 */
ejs.filters.date = function(str, format) {
  return moment(str).format(format);
};

module.exports = ejs;