
    // SUBSCRIBE FUNCTION
    function subscribe() {
      let email = document.getElementById("email").value.trim();
      if (email === "") {
        alert("Please enter your email!");
      } else {
        alert("Subscribed successfully!");
      }
    }

    // CHAT FUNCTION
    function chat() {
      alert("Chat support coming soon!");
    }

    // INIT CAROUSEL
    document.addEventListener('DOMContentLoaded', function() {
      new Swiper('.refund-swiper', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3600,
          disableOnInteraction: false
        },
        speed: 900,
        grabCursor: true,
        slidesPerView: 1,
        breakpoints: {
          650: { slidesPerView: 1 },
          900: { slidesPerView: 2 }
        }
      });
    });
  