var parseProposalJson = function(json) {

  console.log("length", json.proposals.length);

  var proposal_ractive = new Ractive({
    el: '#funnel-proposals',
    template: '#proposals-wrapper',
    data: {
      proposals: json.proposals,
      description_max_ch_count: 286,
      truncateDescription: function(description) {
        var max_character_count = this.get('description_max_ch_count');
        if (description.length < max_character_count) {
          return description;
        } else {
          return description.slice(0, max_character_count) + '<span>...</span>';
        }
      }
    },
    complete: function() {
      var updateFontSize = function(elem) {
        var fontStep = 1;
        var parentWidth = $(elem).width();
        var parentHeight = parseInt($(elem).css('max-height'), 10);
        var childElem = $(elem).find('span');
        while ((childElem.width() > parentWidth) || (childElem.height() > parentHeight)) {
          childElem.css('font-size', parseInt(childElem.css('font-size'), 10) - fontStep + 'px');
        }
      }

      $.each($('.card .title'), function(index, title){
        updateFontSize(title);
      });

      $(".scroll-pane-content").css('width', json.proposals.length * 484 + 'px');

      $('.scroll-pane').jScrollPane({showArrows: true});
    }
  });
}

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

});