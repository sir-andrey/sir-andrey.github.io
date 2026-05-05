// Smooth Scroll for Navigation Links with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Progress Bar
const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

createScrollProgress();

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for Fade In Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and timeline items
document.querySelectorAll('.card, .timeline-item, .project-card, .skill-item').forEach(el => {
  observer.observe(el);
});



// Mobile Menu Toggle (if needed)
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu && navMenu.classList.contains('active')) {
    if (!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
      navMenu.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
    }
  }
});

// Typing Effect for Hero Subtitle (Optional)
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start typing effect after page load
  window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
  });
}

// Skills Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target.getAttribute('data-progress');
      entry.target.style.width = progress + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Copy Email to Clipboard
const emailButton = document.querySelector('.copy-email');
if (emailButton) {
  emailButton.addEventListener('click', () => {
    const email = emailButton.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      // Show tooltip or notification
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = 'Email copied!';
      emailButton.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
  });
}

// Print CV Function
function printCV() {
  window.print();
}

// Download CV as PDF (requires html2pdf library)
function downloadCV() {
  const element = document.body;
  const opt = {
    margin: 0,
    filename: 'Andrey_Maulana_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  
  // Uncomment if using html2pdf library
  // html2pdf().set(opt).from(element).save();
}

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Toggle Experience Section
function toggleExperience(btn) {
  const allItems = document.querySelectorAll('.timeline-item');
  const hiddenItems = Array.from(allItems).slice(2); // Items 3 & 4 (index 2, 3)
  const isExpanded = btn.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse - hide items 3 & 4
    hiddenItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        setTimeout(() => {
          item.classList.add('hidden');
          item.style.opacity = '';
          item.style.transform = '';
        }, 300);
      }, index * 50);
    });
    btn.innerHTML = '<span>Lihat Pengalaman Lainnya</span><i class="fas fa-chevron-down"></i>';
    btn.classList.remove('expanded');
  } else {
    // Expand - show items 3 & 4
    hiddenItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('hidden');
      }, index * 150);
    });
    btn.innerHTML = '<span>Sembunyikan</span><i class="fas fa-chevron-up"></i>';
    btn.classList.add('expanded');
  }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Press 'H' to go home
  if (e.key === 'h' || e.key === 'H') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Press 'P' to go to projects
  if (e.key === 'p' || e.key === 'P') {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
  // Press 'E' to toggle experience
  if (e.key === 'e' || e.key === 'E') {
    const btn = document.querySelector('.show-more-experience');
    if (btn) toggleExperience(btn);
  }
});

// Performance Monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  if (loadTime < 1000) {
    console.log('%c⚡ Fast Load!', 'color: #00d9ff; font-weight: bold;', `${Math.round(loadTime)}ms`);
  }
});

// Console Easter Egg
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cLooking for a talented Back-end Engineer?', 'font-size: 14px; color: #00d9ff;');
console.log('%cLet\'s connect! 📧 sir.andreym@gmail.com', 'font-size: 14px; color: #0ea5e9;');
console.log('%c\nKeyboard Shortcuts:', 'font-weight: bold; color: #0066ff;');
console.log('%cH - Go to top', 'color: #00d9ff;');
console.log('%cP - Go to projects', 'color: #00d9ff;');
console.log('%cE - Toggle experience', 'color: #00d9ff;');

// ========================================
// NEW FUNCTIONS - CV ENHANCEMENT
// ========================================

// Toggle Project Details (Expandable Sections)
function toggleProjectDetails(button) {
  const projectCard = button.closest('.project-card');
  const details = projectCard.querySelector('.project-details');
  const icon = button.querySelector('i');
  
  if (details.classList.contains('hidden')) {
    details.classList.remove('hidden');
    button.classList.add('expanded');
    button.querySelector('span').textContent = 'Hide Technical Details';
  } else {
    details.classList.add('hidden');
    button.classList.remove('expanded');
    button.querySelector('span').textContent = 'View Technical Details';
  }
}

// Enhanced Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
  // Only trigger if not typing in input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  switch(e.key.toLowerCase()) {
    case 'h':
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'p':
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'e':
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 's':
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'c':
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'k':
      document.getElementById('kelolain')?.scrollIntoView({ behavior: 'smooth' });
      break;
  }
});

// Update console keyboard shortcuts info
console.log('%cS - Go to skills', 'color: #00d9ff;');
console.log('%cC - Go to contact', 'color: #00d9ff;');
console.log('%cK - Go to Kelolain section', 'color: #00d9ff;');