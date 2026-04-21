
// Animated counting for stats
function animateStats() {
  const stats = document.querySelectorAll('.stat-animate');
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 80)); // 80 frames
    function updateStat() {
      current += increment;
      if (current < target) {
        stat.textContent = current;
        requestAnimationFrame(updateStat);
      } else {
        stat.textContent = target; // Final value
      }
    }
    updateStat();
  });
}
// Animate when the section is in view, fallback on load
document.addEventListener('DOMContentLoaded', () => {
  let triggered = false;
  function onScroll() {
    if (triggered) return;
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
      const rect = statsSection.getBoundingClientRect();
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      if (rect.top < windowHeight && rect.bottom > 0) {
        animateStats();
        triggered = true;
        window.removeEventListener('scroll', onScroll);
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll(); // in case already in view
});





  var swiper = new Swiper('.about-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.about-swiper-button-next',
      prevEl: '.about-swiper-button-prev',
    },
    pagination: {
      el: '.about-swiper-pagination',
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });




  