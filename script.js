document.addEventListener('DOMContentLoaded', () => {
  // Welcome screen animation
  setTimeout(() => {
    document.querySelector('.welcome-screen').style.opacity = '0';
    document.querySelector('main').classList.remove('hidden');
    document.querySelector('main').classList.add('visible');
    
    setTimeout(() => {
      document.querySelector('.welcome-screen').style.display = 'none';
    }, 1000);
  }, 2000);
});

function openPaymentPopup() {
  document.getElementById('paymentPopup').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('paymentPopup').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
window.onclick = function(event) {
  const popup = document.getElementById('paymentPopup');
  if (event.target === popup) {
    closePopup();
  }
}

// Escape key to close popup
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
});
