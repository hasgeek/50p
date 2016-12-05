$(document).ready(function() {

  var sendGA = function(category, action, label) {
    if (typeof ga !== "undefined") {
      ga('send', { hitType: 'event', eventCategory: category, eventAction: action, eventLabel: label});
    }
  };

  var updateFontSize = function(elem) {
    var fontStep = 1;
    var parentWidth = $(elem).width();
    var parentHeight = parseInt($(elem).css('max-height'), 10);
    var childElem = $(elem).find('span');
    while ((childElem.width() > parentWidth) || (childElem.height() > parentHeight)) {
      childElem.css('font-size', parseInt(childElem.css('font-size'), 10) - fontStep + 'px');
    }
  };

  var getElemWidth = function(elem) {
    var card_width = $(elem).css('width');
    var card_margin = $(elem).css('margin-left');
    var card_total_width = parseInt(card_width, 10) + 2.5 * parseInt(card_margin, 10);
    console.log("card_total_width", card_total_width);
    return card_total_width;
  };

  var enableScroll = function(items_length) {
    $(".mCustomScrollbar").css('width', items_length * getElemWidth(".proposal-card") + 'px');
    $('.mCustomScrollbar').mCustomScrollbar({ axis:"x", theme: "dark-3", scrollInertia: 10, alwaysShowScrollbar: 0});
  };

  var parseProposalJson = function(json) {
    var proposal_ractive = new Ractive({
      el: '#funnel-proposals',
      template: '#proposals-wrapper',
      data: {
        proposals: json.proposals
      },
      complete: function() {
        $.each($('.card .title'), function(index, title) {
          updateFontSize(title);
        });

        //Set width of content div to enable horizontal scrolling
        enableScroll(json.proposals.length);

        $(window).resize(function() {
          enableScroll(json.proposals.length);
        });

        $('#funnel-proposals .click, #funnel-proposals .btn').click(function(event) {
          var action = $(this).data('label');
          var target = $(this).data('target');
          sendGA('click', action, target);
        });
      }
    });
  };

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

  // For proposals
  var proposals_url = 'https://50p.talkfunnel.com/2017/json';

  //If funnel-proposals divs is present on the page, then make the ajax call.
  if(($('#funnel-proposals').length)) {
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: proposals_url,
      success: function(data) {
        parseProposalJson(data);
      }
    });//eof ajax call
  }

  // Function that tracks a click button in Google Analytics.
  $('.button').click(function(event) {
    var button = $(this).html();
    var section = $(this).attr('href');
    sendGA('click', button, section);
  });

  $('.click').click(function(event) {
    var target = $(this).data('target');
    var action = $(this).data('label');
    sendGA('click', action, target);
  });

});