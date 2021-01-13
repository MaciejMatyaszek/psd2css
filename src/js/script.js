var slider;
$(document).ready(function (){
    slider = $('#autoWidth').lightSlider({
      autoWidth: true,
      loop: true,
      controls: false,
      pager: false,
      item: 3,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            item: 3,
            slideMove: 1,
            slideMargin: 5
          }
        },
        {
         breakpoint:480, 
         settings:{
           item: 1,
           slideMove: 1
         } 
      }
    ],
    onSliderLoad: function(){
      $('#autoWidth').removeClass('cS-hidden');
    }
  });
});

$( "#nextSlide" ).click(function() {
  slider.goToNextSlide();
});
$( "#prevSlide" ).click(function() {
  slider.goToPrevSlide();
});
