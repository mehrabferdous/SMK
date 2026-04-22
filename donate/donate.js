
    const cards = document.querySelectorAll('.donate-p-card');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('donate-p-show');
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
  

    
  // Example donation data
  const donationData = {
    labels: ['2019', '2020', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: 'Total Donations (£)',
      data: [18400, 24500, 27900, 25700, 32600, 37600],
      backgroundColor: [
        'rgba(5,150,105,0.76)',
        'rgba(34,197,94, 0.78)',
        'rgba(252,191,73, 0.77)',
        'rgba(220,53,69, 0.68)',
        'rgba(99,102,241, 0.72)',
        'rgba(255,153,51, 0.75)'
      ],
      borderRadius: 12,
      maxBarThickness: 58,
    }]
  };

  // Chart config
  const config = {
    type: 'bar',
    data: donationData,
    options: {
      responsive: true,
      animation: {
        duration: 1600,
        easing: 'easeOutBounce'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => '£' + context.parsed.y.toLocaleString()
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#222d3c',
            font: { weight: 'bold', size: 15 },
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: '#e2e8f0' },
          ticks: {
            color: '#665', 
            font: { size: 13 },
            callback: (value) => '£' + value/1000 + 'k'
          }
        }
      }
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('donate-p-donationBarChart').getContext('2d');
    new Chart(ctx, config);
  });
