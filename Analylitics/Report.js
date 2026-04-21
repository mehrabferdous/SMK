

// Sample Yearly Donation Data (can be replaced with dynamic/backend data)
const donationData = {
  labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
  datasets: [{
    label: 'Total Donations (£)',
    data: [3500, 6200, 8300, 12100, 15800, 17250],
    fill: true,
    backgroundColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 350);
      gradient.addColorStop(0, 'rgba(65, 184, 131, 0.39)');
      gradient.addColorStop(1, 'rgba(65, 184, 131, 0.07)');
      return gradient;
    },
    borderColor: 'rgba(65, 184, 131, 1)',
    borderWidth: 3,
    tension: 0.4,
    pointBackgroundColor: '#189C54',
    pointBorderColor: '#fff',
    pointRadius: 6,
    pointHoverRadius: 9,
    pointHoverBackgroundColor: '#176E48',
    pointHoverBorderColor: '#fff',
    pointBorderWidth: 2,
  }]
};

// Create Chart
window.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('donationChart').getContext('2d');

  // Ensuring responsive gradient by creating it in plugin
  const donationChart = new Chart(ctx, {
    type: 'line',
    data: donationData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#234468',
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return '£' + context.parsed.y.toLocaleString();
            }
          }
        },
        title: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Year',
            color: '#234468',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            display: false
          },
          ticks: {
            color: '#4F4F4F',
            font: { size: 14 }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Donation Amount (£)',
            color: '#234468',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          beginAtZero: true,
          ticks: {
            color: '#4F4F4F',
            stepSize: 2000,
            font: { size: 14 },
            callback: function(value) {
              return '£' + value;
            }
          },
          grid: {
            color: 'rgba(65, 184, 131, 0.09)'
          }
        }
      }
    },
    plugins: [{
      // Plugin to recalculate gradient on resize
      beforeDatasetsDraw(chart) {
        const dataset = chart.data.datasets[0];
        // Only set gradient if not already set for this rendering
        if (dataset._chartGradient || !chart.chartArea) return;
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(65, 184, 131, 0.39)');
        gradient.addColorStop(1, 'rgba(65, 184, 131, 0.07)');
        dataset.backgroundColor = gradient;
        dataset._chartGradient = true; // prevent infinite loops
      }
    }]
  });
});






