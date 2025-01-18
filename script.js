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

  // Animate pricing content
  setTimeout(() => {
    const pricingContent = document.querySelector('.pricing-content');
    pricingContent.classList.add('animate');
  }, 800);

  // Animate pricing tiers with stagger
  const pricingTiers = document.querySelectorAll('.pricing-tier');
  pricingTiers.forEach((tier, index) => {
    setTimeout(() => {
      tier.classList.add('animate');
    }, 1000 + (index * 200));
  });
}

function openPaymentPopup(selectedTierName) {
  const popup = document.getElementById('paymentPopup');
  popup.style.display = 'block';
  // Trigger reflow to enable transition
  popup.offsetHeight;
  popup.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // If a tier was pre-selected, select it
  if (selectedTierName) {
    selectTier(selectedTierName);
  }
}

function closePopup() {
  const popup = document.getElementById('paymentPopup');
  popup.classList.remove('show');
  // Wait for animations to complete before hiding
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 500);
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

let selectedTier = null;
let basePrice = 0;

function selectTier(tier) {
  const buttons = document.querySelectorAll('.tier-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  
  const selectedButton = document.querySelector(`[onclick="selectTier('${tier}')"]`);
  selectedButton.classList.add('selected');
  
  basePrice = parseFloat(selectedButton.dataset.price);
  selectedTier = tier;
  
  // Hide tier selector and show undo button
  document.querySelector('.tier-selector').classList.add('hidden');
  document.querySelector('.undo-tier').classList.add('visible');
  
  // Show selected tier display
  const selectedTierDisplay = document.querySelector('.selected-tier-display');
  selectedTierDisplay.innerHTML = `Selected: ${tier.charAt(0).toUpperCase() + tier.slice(1)} - £${basePrice}`;
  selectedTierDisplay.classList.add('visible');
  
  // Add class to payment option to hide description
  document.querySelector('.payment-option').classList.add('tier-selected');
  
  // Show additional options
  document.querySelector('.additions-selector').classList.add('show');
  document.querySelector('.total-price').classList.add('show');
  document.querySelector('#paypalButton').classList.add('show');
  
  updatePrice();
}

function undoTierSelection() {
  selectedTier = null;
  basePrice = 0;
  
  // Show tier selector and hide undo button
  document.querySelector('.tier-selector').classList.remove('hidden');
  document.querySelector('.undo-tier').classList.remove('visible');
  
  // Hide selected tier display
  document.querySelector('.selected-tier-display').classList.remove('visible');
  
  // Remove class from payment option to show description
  document.querySelector('.payment-option').classList.remove('tier-selected');
  
  // Hide additional options
  document.querySelector('.additions-selector').classList.remove('show');
  document.querySelector('.total-price').classList.remove('show');
  document.querySelector('#paypalButton').classList.remove('show');
  
  // Reset buttons
  const buttons = document.querySelectorAll('.tier-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  
  // Reset checkboxes
  document.getElementById('subtitles').checked = false;
  document.getElementById('reminders').checked = false;
  
  updatePrice();
}

function updatePrice() {
  if (!selectedTier) return;
  
  let total = basePrice;
  
  if (document.getElementById('subtitles').checked) {
    total += 2;
  }
  if (document.getElementById('reminders').checked) {
    total += 1.5;
  }
  
  document.getElementById('totalPrice').textContent = total.toFixed(2);
  updatePayPalLink(total);
}

function updatePayPalLink(total) {
  const paypalButton = document.getElementById('paypalButton');
  paypalButton.href = `https://paypal.me/xdanfr/${total}?return=https://xdan.org.uk/thanks`;
}

function handlePayment() {
  if (!selectedTier) {
    alert('Please select a tier before proceeding to payment.');
    return false;
  }
  return true;
}

function scrollToOffers() {
  closePopup();
  setTimeout(() => {
    const offersSection = document.querySelector('.pricing-content');
    offersSection.scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

function highlightSubtitlesExample() {
  const videoContainer = document.querySelectorAll('.video-container')[1]; // Second video
  videoContainer.classList.add('highlight-video');
  
  // Scroll to the video
  videoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Remove highlight and zoom after animation
  setTimeout(() => {
    videoContainer.classList.remove('highlight-video');
    videoContainer.style.removeProperty('transform');
    videoContainer.style.removeProperty('transition');
  }, 6000); // Remove after 6 seconds
}