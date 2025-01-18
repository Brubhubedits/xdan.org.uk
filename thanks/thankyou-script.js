document.addEventListener('DOMContentLoaded', () => {
  // Welcome screen animation
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
    
    setTimeout(() => {
      document.querySelector('.welcome-screen').style.display = 'none';
      startMainAnimations();
    }, 1000);
  }, 2000);

  // Set up Discord popup functionality
  const discordBtn = document.querySelector('a[href*="discord.gg"]');
  discordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openDiscordPopup();
  });
  
  // Add click event listener to "can't reach" button
  const cantReachBtn = document.querySelector('.cant-reach-btn');
  if (cantReachBtn) {
    cantReachBtn.addEventListener('click', () => {
      const cantReachMsg = document.querySelector('.cant-reach-message');
      cantReachMsg.classList.remove('hidden');
      setTimeout(() => {
        cantReachMsg.classList.add('show');
      }, 10);
    });
  }

  // Close discord popup when clicking outside
  window.addEventListener('click', (event) => {
    const popup = document.querySelector('.discord-popup');
    if (event.target === popup) {
      closeDiscordPopup();
    }
  });
});

function startMainAnimations() {
  // Animate logo container
  const logoContainer = document.querySelector('.logo-container');
  logoContainer.classList.add('animate');

  // Animate thank you content
  setTimeout(() => {
    const thankYouContent = document.querySelector('.thank-you-content');
    thankYouContent.classList.add('animate');
  }, 200);

  // Animate next steps items with stagger
  const nextStepsItems = document.querySelectorAll('.next-steps li');
  nextStepsItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate');
    }, 500 + (index * 200));
  });
}

// Discord popup functionality
function openDiscordPopup() {
  const popup = document.querySelector('.discord-popup');
  if (!popup) return;
  
  popup.style.display = 'block';
  popup.offsetHeight; // Force reflow
  popup.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Animate list items
  const steps = document.querySelectorAll('.help-steps li');
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('animate');
    }, 200 * index);
  });
}

function closeDiscordPopup() {
  const popup = document.querySelector('.discord-popup');
  if (!popup) return;
  
  popup.classList.remove('show');
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset animations
    document.querySelectorAll('.help-steps li').forEach(step => {
      step.classList.remove('animate');
    });
    // Hide cant-reach message if shown
    const cantReachMsg = document.querySelector('.cant-reach-message');
    if (cantReachMsg) {
      cantReachMsg.classList.remove('show');
      cantReachMsg.classList.add('hidden');
    }
  }, 500);
}