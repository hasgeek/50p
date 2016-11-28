$(document).ready(function() {

  $(window).scroll(function() {
    if($(this).scrollTop() > 0 && $("#site-nav").length) {
      $("#site-nav").addClass("navbar-fixed-top");
    }
    else if ($("#site-nav").length) {
      $("#site-nav").removeClass("navbar-fixed-top");
    }
  });

  $('.smooth-scroll').click(function(event) {
    event.preventDefault();
    var section = $(this).attr('href');
    var sectionPos = $(""+section).offset().top - $('.site-navbar').height();
    $('html,body').animate({scrollTop:sectionPos}, '900');
  });

  // Function that tracks a click button in Google Analytics.
  $('.button').click(function(event) {
      var button = $(this).html();
      var section = $(this).attr('href');
      if (typeof ga !== "undefined") {
        ga('send', { hitType: 'event', eventCategory: 'click', eventAction: button, eventLabel: section});
      }
  });

});