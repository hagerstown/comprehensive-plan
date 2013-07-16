/*global $*/
$(function() {

// Twirl open/close TOC sections
$('.section-active .twirl').addClass('open');

$('.twirl').click(function() {
  $(this).toggleClass('open')
    .parent().next().toggle();
  return false;
});

// Prev/next buttons
var $active = $('.active');
var prev = getPrev($active);
var $prev = $('.prev');
var next = getNext($active);
var $next = $('.next');

$('.controls a').hover(function() {
  $(this).toggleClass('over');
});

if (prev) {
  $prev.attr('href', prev.href)
    .children().text(prev.name);
} else {
  $prev.addClass('disabled')
    .click(function() { return false; });
}

if (next) {
  $next.attr('href', next.href)
    .children().text(next.name);
} else {
  $next.addClass('disabled')
    .click(function() { return false; });
}

function getPrev($cur) {
  var $parent = $cur.parent(),
    $prevParent = $parent.prev(),
    $prevLink;

  if (!$cur.length) return false; // at index

  if ($parent.hasClass('section')) { // main section
    $prevLink = $prevParent.find('ul li:last-child a');

    if ($prevParent[0] === undefined) {
      return {
        'name': 'Home',
        'href': $('.title a').attr('href')
      };
    }

    return { 'name': $prevLink.text(), 'href': $prevLink.attr('href') };
  } else { // subsection
    if ($prevParent[0] === undefined) {
      $prevLink = $parent.parent().prev();

      return {
        'name': $prevLink.text(),
        'href': $prevLink.attr('href')
      };
    }

    $prevLink = $prevParent.children();
    return {'name': $prevLink.text(), 'href': $prevLink.attr('href')};
  }
}

function getNext($cur) {
  var $parent = $cur.parent(),
    $nextParent = $parent.next(),
    $nextLink;

  if (!$cur.length) { // at index
    $nextLink = $('.section').first().children('a');
    return {
      'name': $nextLink.text(),
      'href': $nextLink.attr('href')
    };
  }

  if ($parent.hasClass('section')) { // main section
    $nextLink = $cur.next().children().first().children();

    return { 'name': $nextLink.text(), 'href': $nextLink.attr('href') };
  } else { // subsection
    if ($nextParent[0] === undefined) { // last subsection
      $nextLink = $parent.parent().parent().next().children('a');

      if ($nextLink[0] === undefined) return false; // on last page

      return {
        'name': $nextLink.text(),
        'href': $nextLink.attr('href')
      };
    }

    $nextLink = $nextParent.children();
    return {'name': $nextLink.text(), 'href': $nextLink.attr('href')};
  }
}

});
