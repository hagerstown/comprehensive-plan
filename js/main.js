
// Twirl open/close TOC sections
$('.section-active .twirl').addClass('open');

$('.twirl').click(function() {
  $(this).toggleClass('open')
    .parent().next().toggle();
  return false;
});
