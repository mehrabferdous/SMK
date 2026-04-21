// Animate slides on entrance
function animateVisibleSlides(swiper) {
    swiper.slides.forEach((slide, idx) => {
        if (
            slide.classList.contains('swiper-slide-active') ||
            slide.classList.contains('swiper-slide-next') ||
            slide.classList.contains('swiper-slide-prev')
        ) {
            slide.style.opacity = '1';
            slide.style.transform = 'translateY(0) scale(1)';
            slide.style.transitionDelay = (idx % 3) * 0.07 + 's';
        } else {
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(48px) scale(0.95)';
            slide.style.transitionDelay = '0s';
        }
    });
}

// Swiper initialization
document.addEventListener('DOMContentLoaded', function () {
  const ongoingSwiper = new Swiper('.ongoing-campaign-swiper', {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    speed: 700,
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    effect: "slide",
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
        centeredSlides: false,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
      }
    },
    on: {
      init: function () { animateVisibleSlides(this); },
      slideChangeTransitionStart: function () { animateVisibleSlides(this); },
      resize: function () { animateVisibleSlides(this); }
    }
  });
});


  // Funding data categories
  const fundingData = [
    { label: "Community Projects", value: 40, color: "#518adc" },
    { label: "Education & Training", value: 25, color: "#80d388" },
    { label: "Health Services", value: 15, color: "#ffc15a" },
    { label: "Emergency Relief", value: 12, color: "#fb6b6b" },
    { label: "Administrative", value: 8, color: "#816be6" }
  ];

  let fundingPie = null;
  let pieChartAnimated = false;
  let pieCanvasWidth = 320;

  // Only render/rescale chart ONCE unless window size changes by a significant amount
  function renderPieChart(animate=true) {
    const canvas = document.getElementById('fundingPieChart');
    const ctx = canvas.getContext('2d');
    // Destroy previous chart
    if (fundingPie) {
      fundingPie.destroy();
      fundingPie = null;
    }
    fundingPie = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: fundingData.map(x => x.label),
        datasets: [{
          data: fundingData.map(x => x.value),
          backgroundColor: fundingData.map(x => x.color),
          borderWidth: 2,
          borderColor: "#f8f8fd"
        }]
      },
      options: {
        cutout: '52%',
        responsive: false,
        maintainAspectRatio: false,
        animation: animate ? { duration: 1200, easing: "easeOutCubic" } : false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#263470",
            titleColor: "#fff",
            bodyColor: "#fff"
          }
        }
      }
    });
  }

  // Generate custom legend
  function updatePieLegend() {
    const legend = document.getElementById("fundingPieLegend");
    legend.innerHTML = "";
    fundingData.forEach(d => {
      const item = document.createElement("div");
      item.className = "pie-chart-legend-item";
      item.innerHTML = `<span class="pie-chart-color" style="background:${d.color};"></span> ${d.label} <strong style="margin-left:4px;">${d.value}%</strong>`;
      legend.appendChild(item);
    });
  }

  // Check if pie chart is in viewport
  function pieChartInView() {
    const chartDiv = document.getElementById('fundingPieChart');
    if (!chartDiv) return false;
    const rect = chartDiv.getBoundingClientRect();
    return rect.top < window.innerHeight-40 && rect.bottom > 40;
  }

  // Only render chart when in view and only once per session
  function onScrollRender() {
    if (!pieChartAnimated && pieChartInView()) {
      renderPieChart(true);
      pieChartAnimated = true;
      // Remove scroll event to avoid memory leaks (only one use)
      window.removeEventListener('scroll', onScrollRender);
    }
  }

  // Only resize if width changed significantly
  let lastChartWidth = null;
  function resizePieCanvas() {
    const canvas = document.getElementById('fundingPieChart');
    if (!canvas) return;
    // Only update width if it changed by more than 12px
    const newWidth = Math.min(340, Math.floor(document.body.clientWidth * 0.72));
    if (Math.abs(newWidth - (lastChartWidth||0)) > 12) {
      canvas.width = newWidth;
      canvas.height = newWidth;
      lastChartWidth = newWidth;
      // Only rerender if already animated
      if (pieChartAnimated) {
        renderPieChart(false);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updatePieLegend();
    resizePieCanvas();
    // Animate only when visible
    if (pieChartInView()) {
      renderPieChart(true);
      pieChartAnimated = true;
    } else {
      // Attach scroll only if not yet shown
      window.addEventListener('scroll', onScrollRender, { passive: true });
    }
    // Use a debounced resize to prevent too many reflows and chart destruction/recreation
    let resizeTimeout = null;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizePieCanvas, 100);
    });
  });







    // Animate quick donate cards on scroll into view
    function setQuickDonateCardsAnimation() {
        const quickCards = document.querySelectorAll('.quick-donate-card');
        function animateIfInView() {
          const section = document.querySelector('.quick-donate-section');
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const threshold = 100; // px
          if (
            rect.top < window.innerHeight - threshold &&
            rect.bottom > threshold
          ) {
            quickCards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.add('animated');
              }, i * 120 + 30); // stagger appearance
            });
            window.removeEventListener('scroll', animateIfInView);
          }
        }
        animateIfInView();
        window.addEventListener('scroll', animateIfInView, { passive: true });
      }
    
      document.addEventListener('DOMContentLoaded', setQuickDonateCardsAnimation);

      function telaport(){
        window.location.href = "../donate/donate.html";
      }