$(document).ready(function () {

  /*Materialize*/
  $('.parallax').parallax();
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });
  // Initialize collapse button
  $(".button-collapse").sideNav();

  $('.modal').modal();

  /* Custom JS */
  $("#nextBtn").click(function () {
    $('.carousel').carousel('next');
  });

  $("#prevBtn").click(function () {
    $('.carousel').carousel('prev');
  });

});


/*Video cover controls*/

$.fn.extend({
  toggleHtml: function (a, b) {
    return this.html(this.html() == b ? a : b);
  }
});

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
  playerDefaults = {
    autoplay: 0,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 0,
    iv_load_policy: 3
  };
var vid = [{
    'videoId': 's4pEaXdUsPY',
    'startSeconds': 10,
    'endSeconds': 200,
    'suggestedQuality': 'hd720'
  }],
  randomVid = Math.floor(Math.random() * vid.length),
  currVid = randomVid;

$('.hi em:last-of-type').html(vid.length);

function onYouTubePlayerAPIReady() {
  tv = new YT.Player('tv', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: playerDefaults
  });
}

function onPlayerReady() {
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1) {
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 2) {
    $('#tv').removeClass('active');
    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
}

function vidRescale() {

  var w = $(".tv").width(),
    h = $(".tv").height();

  if (w / h > 16 / 9) {
    tv.setSize(w, w / 16 * 9);
    $('.tv .screen').css({
      'left': '0px'
    });
  } else {
    tv.setSize(h / 9 * 16, h);
    $('.tv .screen').css({
      'left': -($('.tv .screen').outerWidth() - w) / 2
    });
  }
}

$(window).on('load resize', function () {
  vidRescale();
});

$('#muter').on('click', function () {
  $('#tv').toggleClass('mute');
  $('#muter').toggleClass('hidden');
  if ($('#tv').hasClass('mute')) {
    tv.mute();

  } else {
    tv.unMute();
  }
});

$('.hi span:last-of-type').on('click', function () {
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});