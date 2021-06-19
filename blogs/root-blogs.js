$(window).scroll(function () {
  var wScroll = $(this).scrollTop();

  if (wScroll > $('.ads').offset().top - 650) {
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

  if (wScroll > $('.ads').offset().top - 600) {
    $('.sidebar').css({
      display: 'none',
    });
  } else {
    $('.sidebar').css({
      display: 'inline-block',
    });
  }
});

$(document).ready(function () {
  $('.onclick').click(function () {
    $('.true').addClass('btn-success');
    $('.true').removeClass('btn-primary');
    $('.false').addClass('btn-danger');
    $('.false').removeClass('btn-primary');
  });
  $('.true').click(function () {
    $('.ans').css({
      background: 'rgb(24 253 145 / 32%)',
    });
  });
  $('.false').click(function () {
    $('.ans').css({
      background: 'rgb(220 53 69 / 32%)',
    });
  });
});

// var ads = $('.ad');
// $(window).resize(function () {
//   if (ads.width() < 385) {
//     $('.mobile').removeClass('sidebar');
//     $('.mobile').removeClass('position-fixed');
//     $('.mobile').addClass('side');
//     $('.side').css({
//       with: '100%',
//       display: 'inline-block',
//     });
//     // $('.sidebar').css({
//     //   display: 'inline-block',
//     // });
//     // console.log('OKE');
//   } else {
//     $('.mobile').addClass('sidebar');
//     $('.mobile').addClass('position-fixed');
//     $('.mobile').removeClass('side');
//     $('.sidebar').css({
//       with: '190px',
//     });
//     // console.log('err');
//   }
// });

// // $('.navbar').addClass('shadow p-3 mb-5');
// // $('.navbar').removeClass('navbar-dark');
// $(window).resize(function () {
//   var ad = $('.ad');
//   if (ad.width() == 800) {
//     $(window).scroll(function () {
//       var wScroll = $(this).scrollTop();
//       if (wScroll > 60) {
//         console.log('oke');
//       }
//     });
//   }
// });
