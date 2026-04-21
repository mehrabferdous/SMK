const form = document.getElementById('apply-donationForm');
const success = document.getElementById('apply-successMsg');

form.addEventListener('submit', function(e){
  e.preventDefault();

  form.style.display = 'none';
  success.style.display = 'block';
});