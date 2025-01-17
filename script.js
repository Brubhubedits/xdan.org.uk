document.addEventListener('DOMContentLoaded', () => {
  // Welcome screen animation with typing effect
  const welcomeText = document.querySelector('.welcome-screen h1');
  welcomeText.style.opacity = '0';
  welcomeText.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    welcomeText.style.transition = 'all 0.5s ease';
    welcomeText.style.opacity = '1';
    welcomeText.style.transform = 'scale(1)';
  }, 300);

  setTimeout(() => {
    welcomeText.style.transition = 'all 1s ease';
    welcomeText.style.opacity = '0';
    welcomeText.style.transform = 'scale(1.2)';
    document.querySelector('main').classList.remove('hidden');
    document.querySelector('main').classList.add('visible');
    
    // Start cascade animations after welcome screen fades
    setTimeout(() => {
      document.querySelector('.welcome-screen').style.display = 'none';
      startMainAnimations();
    }, 1000);
  }, 2000);
});

function startMainAnimations() {
  // Animate logo container
  const logoContainer = document.querySelector('.logo-container');
  logoContainer.classList.add('animate');

  // Animate description content
  setTimeout(() => {
    const descriptionContent = document.querySelector('.description-content');
    descriptionContent.classList.add('animate');
  }, 200);

  // Animate portfolio title
  setTimeout(() => {
    const portfolioTitle = document.querySelector('.portfolio h2');
    portfolioTitle.classList.add('section-animate', 'animate');
  }, 400);

  // Animate video containers with staggered delay
  const videoContainers = document.querySelectorAll('.video-container');
  videoContainers.forEach((container, index) => {
    setTimeout(() => {
      container.classList.add('animate');
    }, 600 + (index * 200));
  });
}

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
