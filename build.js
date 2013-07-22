/**
 * Module dependencies.
 */

var fs = require('fs-extra')
  , Page = require('./lib/page')
  , ejs = require('./lib/ejs');
  

// Copy over contents of `public/`
fs.copy('./public/', './build/', function(err) {
  if (err) console.error(err);
  
  // Walk the contents folder and generate pages
  fs.readdir('./content', function(err, items) {
    items.forEach(function(item) {
      var page;
      if ((/\.md/).test(item)) {
        page = new Page('./content/' + item);
        writeFile(page);
      } else {
        fs.readdir('./content/' + item, function(err, pages) {
          pages.forEach(function(page) {
            page = new Page('./content/' + item + '/' + page);
            writeFile(page);
          });
        });
      }
    });
  });
  
  function writeFile(page) {
    var layoutPath = './layouts/default.ejs'
    , layoutStr = fs.readFileSync(layoutPath, 'utf8')
    , html;
    
    page.filename = layoutPath;
    html = ejs.render(layoutStr, page);
    fs.outputFile('./build/' + page.url + '/index.html', html);
  }
});
