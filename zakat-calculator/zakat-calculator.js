
// Zakat Calculation
function calcZakat() {
  const gold = parseFloat(document.getElementById("zakat-calc-gold").value) || 0;
  const silver = parseFloat(document.getElementById("zakat-calc-silver").value) || 0;
  const cash = parseFloat(document.getElementById("zakat-calc-cash").value) || 0;
  const business = parseFloat(document.getElementById("zakat-calc-business").value) || 0;
  const debt = parseFloat(document.getElementById("zakat-calc-debt").value) || 0;

  const totalWealth = gold + silver + cash + business - debt;
  const zakat = totalWealth * 0.025;

  const resultDiv = document.getElementById("zakat-calc-result");

  if (totalWealth <= 0) {
    resultDiv.innerHTML = "No Zakat applicable.";
  } else {
    resultDiv.innerHTML = `
      Total Wealth: ${totalWealth.toFixed(2)} <br><br>
      Zakat (2.5%): <strong>${zakat.toFixed(2)}</strong>
    `;
  }
  resultDiv.classList.add("zakat-calc-show");
}

// Swiper Carousel Initialization
document.addEventListener('DOMContentLoaded', function () {
  // Swiper
  new Swiper('.zakat-calc-swiper', {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    autoplay: {
      delay: 3200,
      disableOnInteraction: false
    },
    effect: 'slide',
    speed: 800,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      700: { slidesPerView: 2 },
      980: { slidesPerView: 3 },
      1200: { slidesPerView: 3 }
    }
  });

  // Zakat Button Event
  var calcBtn = document.getElementById('zakat-calc-btn');
  if(calcBtn){
    calcBtn.addEventListener('click', calcZakat);
  }

  // Animate donation cards when visible
  function observerCallback(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
      }
    });
  }
  var cards = document.querySelectorAll('.donation-card');
  var observer = new IntersectionObserver(observerCallback, { threshold: 0.08 });
  cards.forEach(card => observer.observe(card));
});
