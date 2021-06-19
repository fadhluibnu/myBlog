$(document).ready(function () {
  $('.onclick').click(function () {
    $('.true').addClass('btn-success');
    $('.true').removeClass('btn-light');
    $('.false').addClass('btn-danger');
    $('.false').removeClass('btn-light');
  });
  $('.true').click(function () {
    $('.ans').removeClass('btn-danger');
    $('.ans').addClass('btn-success');
  });
  $('.false').click(function () {
    $('.ans').removeClass('btn-success');
    $('.ans').addClass('btn-danger');
  });
});
