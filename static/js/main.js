$(document).ready(function() {
  //Subscribe
  $('#subscribe').on('submit', function(event) {
    event.preventDefault();
    $('.subscribe-status').html('');
    var postData ={};
    if($('#subscribe-email').val() === "") {
      $('.subscribe-status').html('Please enter an email id');
    }
    else {
      postData = { "Email": $('#subscribe-email').val(), "Event" : "50p 2016" };
      $('.ajax-loader').css('visibility', 'visible');
      $.ajax({
        type: 'post',
        url: 'https://script.google.com/macros/s/AKfycbwkkVFfdoQF7_aozgUPyfxDuuxOrN2melaehVBcsuP84Fa7Vks/exec',
        data: postData,
        dataType: 'json',
        timeout: 5000,
        complete: function(response, textStatus) {
          $('.ajax-loader').css('visibility', 'hidden');
          if(response.status === 200) {
            $("#subscribe")[0].reset();
            $('.subscribe-status').show().html('Thank you for subscribing!');
          }
          else {
            $('.subscribe-status').show().html('Error, try again.');
          }
        }
      });
    }
  });

  $('.smooth-scroll').click(function(event) {
    event.preventDefault();
    var section = $(this).attr('href');
    var sectionPos = $(""+section).offset().top - $('.site-navbar').height();
    $('html,body').animate({scrollTop:sectionPos}, '900');
  });
});