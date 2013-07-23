/**
 * Module dependencies.
 */

var fs = require('fs-extra')
  , lunr = require('lunr')
  , Site = require('./lib/site')
  , ejs = require('./lib/ejs');
  

// Create a new  `Site`
var site = new Site();

// Copy over contents of `public/`
fs.copy('./public/', './build/', function(err) {
  if (err) throw err;
  
  // Generate pages
  site.pages.forEach(function(page) {
    var layoutPath = './layouts/default.ejs'
    , layoutStr = fs.readFileSync(layoutPath, 'utf8')
    , html;
    
    page.filename = layoutPath;
    page.site = site;
    html = ejs.render(layoutStr, page);
    fs.outputFile('./build/' + page.url + '/index.html', html);
  });
  
  // Create lunr index for site-wide search
  var index = lunr(function() {
    this.ref('id');
    this.field('title');
    this.field('body');
  });
  
  var pages = site.pages.map(function(page) {
    return {
      id: page.id,
      title: page.title,
      body: page.body
    };
  });
  
  pages.forEach(function(page) {
    index.add(page);
  });
  
  fs.outputFile('./build/index.json', JSON.stringify(index), function (err) {
    if (err) throw err;
  });
});
