// Professional Portfolio Interactions
// Only keep code for features present in index.html

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeHoverEffects();
    initializeProgressBar();
    initializeBackToTop();
    initializeParticles();
    initializeSkillAnimations();
    initializeParallaxEffects();
    animateNeuralNetworkSVG();
    animateHeroTextReveal();
    initializeProfilePhotoTilt();
    animateHeroNameTyping();

    // Open external links in new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                window.open(this.href, '_blank', 'noopener,noreferrer');
                e.preventDefault();
            }
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        setTheme(localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
        themeToggle.addEventListener('click', function() {
            setTheme(document.body.classList.contains('light-mode') ? 'dark' : 'light');
        });
    }

    // Mobile skill slider arrows
    document.querySelectorAll('.slider-with-arrows').forEach(function(slider) {
        const leftArrow = slider.querySelector('.slider-arrow.left');
        const rightArrow = slider.querySelector('.slider-arrow.right');
        const content = slider.querySelector('.slider-content');
        if (leftArrow && content) leftArrow.addEventListener('click', () => content.scrollBy({ left: -120, behavior: 'smooth' }));
        if (rightArrow && content) rightArrow.addEventListener('click', () => content.scrollBy({ left: 120, behavior: 'smooth' }));
    });

    // 3D Tilt effect for project cards
    (function() {
      const cards = document.querySelectorAll('.tilt-effect');
      const maxTilt = 18; // degrees
      const perspective = 700;
      function handleMouseMove(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = (x - cx) / cx;
        const dy = (y - cy) / cy;
        card.style.transform = `perspective(${perspective}px) rotateY(${-dx * maxTilt}deg) rotateX(${dy * maxTilt}deg) scale(1.04)`;
      }
      function resetTilt() {
        this.style.transform = '';
      }
      cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', resetTilt);
        card.addEventListener('mouseenter', function() {
          card.style.transition = 'transform 0.18s cubic-bezier(.4,2,.6,1)';
        });
      });
      // Disable on touch devices
      if ('ontouchstart' in window) {
        cards.forEach(card => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', resetTilt);
        });
      }
    })();

    // Entrance animation for project cards
    (function() {
      const cards = document.querySelectorAll('.project-card');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        }, { threshold: 0.18 });
        cards.forEach(card => observer.observe(card));
      } else {
        // Fallback: show all if no IntersectionObserver
        cards.forEach(card => card.classList.add('in-view'));
      }
    })();

    // Project Details Modal logic
    (function() {
      const modal = document.getElementById('project-modal');
      const modalBody = modal.querySelector('.project-modal-body');
      const closeBtn = modal.querySelector('.project-modal-close');
      const backdrop = modal.querySelector('.project-modal-backdrop');
      let lastFocused = null;

      function openModal(card) {
        // Save last focused element
        lastFocused = document.activeElement;
        // Get data attributes
        const title = card.getAttribute('data-title') || '';
        const desc = card.getAttribute('data-description') || '';
        const imgs = [card.getAttribute('data-img1'), card.getAttribute('data-img2'), card.getAttribute('data-img3')].filter(Boolean);
        const linkDemo = card.getAttribute('data-link-demo');
        const linkGitHub = card.getAttribute('data-link-github');
        // Build modal content
        let html = `<h2>${title}</h2>`;
        if (imgs.length) {
          html += '<div class="modal-imgs">';
          imgs.forEach(src => {
            html += `<img src="${src}" alt="${title} screenshot" loading="lazy">`;
          });
          html += '</div>';
        }
        html += `<p>${desc}</p>`;
        html += '<div class="modal-links">';
        if (linkDemo) html += `<a href="${linkDemo}" class="project-btn" target="_blank">Live Demo</a>`;
        if (linkGitHub) html += `<a href="${linkGitHub}" class="project-btn secondary" target="_blank">GitHub</a>`;
        html += '</div>';
        modalBody.innerHTML = html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
      }
      function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
      }
      // Open modal on card click
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
          // Prevent link clicks from opening modal
          if (e.target.closest('a')) return;
          openModal(card);
        });
      });
      // Close modal
      closeBtn.addEventListener('click', closeModal);
      backdrop.addEventListener('click', closeModal);
      document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
      });
    })();

    // Mobile swipe down to close and image zoom for project modal
    (function() {
      const modal = document.getElementById('project-modal');
      const modalContent = modal.querySelector('.project-modal-content');
      let startY = null, currentY = null, dragging = false;

      // Swipe down to close (touch only)
      if ('ontouchstart' in window) {
        modalContent.addEventListener('touchstart', function(e) {
          if (e.touches.length !== 1) return;
          startY = e.touches[0].clientY;
          dragging = true;
        });
        modalContent.addEventListener('touchmove', function(e) {
          if (!dragging || e.touches.length !== 1) return;
          currentY = e.touches[0].clientY;
          const deltaY = currentY - startY;
          if (deltaY > 0) {
            modalContent.style.transform = `translateY(${deltaY}px)`;
            modalContent.style.transition = 'none';
          }
        });
        modalContent.addEventListener('touchend', function(e) {
          if (!dragging) return;
          const deltaY = (currentY || 0) - (startY || 0);
          modalContent.style.transition = '';
          if (deltaY > 60) {
            // Close modal
            modal.classList.remove('active');
            document.body.style.overflow = '';
          } else {
            modalContent.style.transform = '';
          }
          dragging = false;
          startY = null;
          currentY = null;
        });
      }

      // Image zoom on tap
      document.addEventListener('click', function(e) {
        const img = e.target.closest('.modal-imgs img');
        if (!img) return;
        // Create zoom overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(20,24,40,0.92)';
        overlay.style.zIndex = 20000;
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'zoom-out';
        overlay.innerHTML = `<img src="${img.src}" alt="Zoomed image" style="max-width:96vw;max-height:92vh;border-radius:1.2em;box-shadow:0 8px 48px #23294688;">`;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        overlay.addEventListener('click', function() {
          overlay.remove();
          document.body.style.overflow = '';
        });
      });
    })();
});

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    window.addEventListener('scroll', throttle(() => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }, 100));
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' };
    const sectionObserver = new IntersectionObserver((entries) => {
        let foundActive = false;
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                    foundActive = true;
                }
            }
        });
        if (!foundActive && window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
}

function initializeAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

function initializeHoverEffects() {
    // Experience and education items
    document.querySelectorAll('.experience-item, .education-item').forEach(item => {
        item.addEventListener('mouseenter', function() { if (!isMobile()) this.style.transform = 'translateX(12px)'; });
        item.addEventListener('mouseleave', function() { if (!isMobile()) this.style.transform = 'translateX(0)'; });
    });
    // Achievement items
    document.querySelectorAll('.achievement-item').forEach(item => {
        const icon = item.querySelector('i');
        item.addEventListener('mouseenter', function() { if (icon && !isMobile()) { icon.style.transform = 'scale(1.2) rotate(5deg)'; icon.style.color = '#2d5aa0'; } });
        item.addEventListener('mouseleave', function() { if (icon && !isMobile()) { icon.style.transform = 'scale(1) rotate(0deg)'; icon.style.color = '#3182ce'; } });
    });
    }

function initializeProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:4px;background:linear-gradient(135deg,#1a365d 0%,#2d5aa0 50%,#3182ce 100%);z-index:1000;transition:width 0.3s ease;box-shadow:0 2px 4px rgba(0,0,0,0.1)';
    document.body.appendChild(progressBar);
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { updateProgressBar(); ticking = false; });
            ticking = true;
        }
    });
}
function updateProgressBar() {
    const progressBar = document.querySelector('div[style*="position: fixed"][style*="top: 0"]');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:linear-gradient(135deg,#1a365d 0%,#2d5aa0 50%,#3182ce 100%);color:white;border:none;border-radius:50%;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s ease;box-shadow:0 4px 12px rgba(49,130,206,0.3);z-index:1000;font-size:1.2rem;';
    document.body.appendChild(backToTopBtn);
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }, 100));
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    if (isMobile()) {
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.width = '45px';
        backToTopBtn.style.height = '45px';
        backToTopBtn.style.fontSize = '1rem';
    }
}

function initializeParticles() {
    if (isMobile()) return;
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:hidden;';
    document.body.appendChild(particleContainer);
    for (let i = 0; i < 20; i++) createParticle(particleContainer);
    }
function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = 'position:absolute;width:4px;height:4px;background:rgba(49,130,206,0.3);border-radius:50%;pointer-events:none;';
    container.appendChild(particle);
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = 3000 + Math.random() * 4000;
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    animateParticle(particle, duration);
}
function animateParticle(particle, duration) {
    const startTime = Date.now();
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        if (progress >= 1) {
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            animateParticle(particle, duration);
            return;
        }
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        particle.style.left = (currentX + Math.sin(progress * Math.PI * 2) * 2) + 'px';
        particle.style.top = (currentY + Math.cos(progress * Math.PI * 2) * 2) + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

function initializeSkillAnimations() {
    // No skill bars in this design, but keep for future use
}

function initializeParallaxEffects() {
    if (isMobile()) return;
    window.addEventListener('scroll', throttle(() => {
        document.querySelectorAll('.ai-bg-svg-full').forEach(element => {
            element.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        });
    }, 16));
}

function animateNeuralNetworkSVG() {
    const nodes = document.querySelectorAll('#nn-nodes circle');
    const lines = document.querySelectorAll('#nn-lines line');
    nodes.forEach((node, index) => {
        setTimeout(() => { node.style.animation = 'aiGlowPulse 3s ease-in-out infinite alternate'; }, index * 200);
    });
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.strokeDasharray = line.getTotalLength();
            line.style.strokeDashoffset = line.getTotalLength();
            line.style.animation = 'drawLine 2s ease-in-out forwards';
        }, index * 100);
    });
    const style = document.createElement('style');
    style.textContent = '@keyframes drawLine { to { stroke-dashoffset: 0; } }';
    document.head.appendChild(style);
}

function animateHeroTextReveal() {
    document.querySelectorAll('.hero-anim').forEach((el, i) => {
        setTimeout(() => { el.classList.add('visible'); }, 350 + i * 180);
    });
}

function initializeProfilePhotoTilt() {
    const photo = document.querySelector('.profile-photo.ai-glow');
    if (!photo) return;
    let timeout;
    photo.addEventListener('mousemove', e => {
        const rect = photo.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 10;
        const rotateX = ((centerY - y) / centerY) * 6;
        photo.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.07)`;
        photo.classList.add('tilted');
        clearTimeout(timeout);
        timeout = setTimeout(() => photo.classList.remove('tilted'), 400);
    });
    photo.addEventListener('mouseleave', () => {
        photo.style.transform = '';
        photo.classList.remove('tilted');
    });
}

function animateHeroNameTyping() {
    const nameEl = document.querySelector('.hero-name span');
    if (!nameEl) return;
    const text = nameEl.textContent;
    nameEl.textContent = '';
    nameEl.style.position = 'relative';
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.display = 'inline-block';
    cursor.style.marginLeft = '2px';
    cursor.style.color = '#3182ce';
    cursor.style.fontWeight = '900';
    cursor.style.animation = 'blink-cursor 1s steps(2, start) infinite';
    nameEl.appendChild(cursor);
    let i = 0;
    function type() {
        if (i < text.length) {
            nameEl.insertBefore(document.createTextNode(text.charAt(i)), cursor);
            i++;
            setTimeout(type, 90);
        } else {
            setTimeout(() => cursor.remove(), 800);
        }
    }
    setTimeout(type, 400);
}
(function addCursorKeyframes() {
    const style = document.createElement('style');
    style.textContent = '@keyframes blink-cursor { 0%,100%{opacity:1;} 50%{opacity:0;} }';
    document.head.appendChild(style);
})();

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}
function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
function setTheme(mode) {
    const body = document.body;
    if (mode === 'light') {
        body.classList.add('light-mode');
        document.getElementById('theme-toggle-icon').className = 'fas fa-sun';
    } else {
        body.classList.remove('light-mode');
        document.getElementById('theme-toggle-icon').className = 'fas fa-moon';
    }
    localStorage.setItem('theme', mode);
}
// Animated role switcher: AI/ML Engineer <-> Data Science
(function() {
  const roleEl = document.getElementById('hero-role-animated');
  if (!roleEl) return;
  const roles = ['AI/ML Engineer', 'Data Science'];
  let idx = 0;
  setInterval(() => {
    roleEl.style.transition = 'opacity 0.5s';
    roleEl.style.opacity = 0;
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      roleEl.textContent = roles[idx];
      roleEl.style.opacity = 1;
    }, 500);
  }, 2500);
})(); 