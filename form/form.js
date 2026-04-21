// simple animation on load
window.addEventListener('load',()=>{
    document.querySelector('.form-card').style.transform='scale(1)';
  });
  
  // Swiper Carousel Initialization
  document.addEventListener('DOMContentLoaded', function () {
    new Swiper('.recent-projects-swiper', {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      autoplay: {
        delay: 3100,
        disableOnInteraction: false
      },
      effect: 'slide',
      speed: 750,
      grabCursor: true,
      slidesPerView: 3,
      spaceBetween: 35,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        600: { slidesPerView: 2, spaceBetween: 18 },
        900: { slidesPerView: 3, spaceBetween: 35 }
      }
    });
  });