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
    this.field('title', {boost: 10});
    this.field('body');
  });
  
  // Cleanup page array for lunr
  var pages = site.pages.map(function(page) {
    return {
      id: page.id,
      title: page.title,
      body: page.body.replace(/<[^>]+>/g, '')
    };
  });
  
  // Add our page data to the lunr index
  pages.forEach(function(page) {
    index.add(page);
  });
  
  // Cleanup page data for templates
  var siteData = site.pages.map(function(page) {
    return {
      id: page.id,
      title: page.title,
      url: page.url
    };
  });
  
  // Write lunr index json
  fs.outputFile('./build/site-index.json',
    JSON.stringify(index),
    function(err) {
      if (err) throw err;
    });
  
  // Write template json
  fs.outputFile('./build/site-data.json',
    JSON.stringify(siteData),
    function(err) {
      if (err) throw err;
    });
});
