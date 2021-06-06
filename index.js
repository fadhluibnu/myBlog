$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  if (wScroll > 40) {
    $('.navbar').addClass('fixed-top');
    $('.navbar').addClass('shadow p-3 mb-5');
    $('.navbar').removeClass('navbar-dark');
    $('.navbar').addClass('navbar-light');
    $('.navbar').addClass('bg-light');
    $('.navbar').removeClass('bg');
  } else {
    $('.navbar').removeClass('fixed-top');
    $('.navbar').removeClass('shadow p-3 mb-5');
    $('.navbar').addClass('navbar-dark');
    $('.navbar').removeClass('navbar-light');
    $('.navbar').removeClass('bg-light');
    $('.navbar').addClass('bg');
  }
});
