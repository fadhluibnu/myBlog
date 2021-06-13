$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  if (wScroll > $('.ads').offset().top - 800) {
    $('.sidebar').css({
      //   display: 'none',
      transition: '0.3s',
      transform: 'translateX(248px)',
      position: 'static',
    });
  } else {
    $('.sidebar').css({
      // display: 'inline-block',
      transition: '0.3s',
      transform: 'translateX(0)',
      position: 'fixed',
    });
  }
});
