$(document).ready(function(){
  // tabs menu
  var tabNav = $('#tab-nav');
  // tab content elements
  var tabs = {
    first: $('#first'),
    second: $('#second'),
    third: $('#third'),
    fourth: $('#fourth')
  };
  // initialize first tab to be selected
  var selected = tabs.first;
  // initialize first tab to be shown
  selected.show();

  var animClasses = {
    out: ['fadeOutLeft', 'fadeOutRight'],
    in: ['fadeInRight', 'fadeInLeft']
  };

  var inTransition = false;

  tabNav.on('click', function(e) {
    // prevent jumping to hash id value
    e.preventDefault();
    // if clicked element is not <a> tag, do nothing
    if (e.target.tagName !== 'A' || inTransition) return;
    var last = selected;
    selected = tabs[e.target.hash.split('#')[1]];
    var currIdx = selected.index();
    var prevIdx = last.index();
    // if clicking on the same tab, do nothing
    if (currIdx === prevIdx) return;
    inTransition = true;
    var direction = currIdx > prevIdx ? 0 : 1;

    tabNav
      .find('a.active')
      .removeClass('active')
      .parent()
      .removeClass('bounceIn');

    tabNav
      .find('a[href="' + e.target.hash + '"]')
      .addClass('active')
      .parent()
      .addClass('bounceIn');

    last
      .addClass(animClasses.out[direction])
      .fadeOut(300, function() {
        last.attr('class', 'tab-content animated');
        inTransition = false;
      });

    selected
      .addClass(animClasses.in[direction])
      .fadeIn(300, function() {
        selected.attr('class', 'tab-content animated');
        inTransition = false;
      });
  });

});
