// Professional Portfolio Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all professional features
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeHoverEffects();
    initializeTypingEffect();
    initializeProgressBar();
    initializeBackToTop();
    initializeParticles();
    initializeSkillAnimations();
    initializeParallaxEffects();
    initializeLoadingAnimation();
    initializeMobileOptimizations();
    handleSkillBarAnimation();
    animateNeuralNetworkSVG();
    initializeContactForm();
    initializeHeaderCardParticles();
    animateHeroTextReveal();
    initializeProfilePhotoTilt();
    animateHeroNameTyping();

    // Bulletproof fix: force all external links to open in a new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only open in new tab if not already handled by browser (e.g., middle click)
            if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                window.open(this.href, '_blank', 'noopener,noreferrer');
                e.preventDefault();
            }
        });
    });

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('light-mode')) {
                setTheme('dark');
            } else {
                setTheme('light');
            }
        });
    }

    // Slider arrow scroll for mobile skill sliders
    document.querySelectorAll('.slider-with-arrows').forEach(function(slider) {
        const leftArrow = slider.querySelector('.slider-arrow.left');
        const rightArrow = slider.querySelector('.slider-arrow.right');
        const content = slider.querySelector('.slider-content');
        if (leftArrow && content) {
            leftArrow.addEventListener('click', function(e) {
                content.scrollBy({ left: -120, behavior: 'smooth' });
            });
        }
        if (rightArrow && content) {
            rightArrow.addEventListener('click', function(e) {
                content.scrollBy({ left: 120, behavior: 'smooth' });
            });
        }
    });
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));
    
    // Active section highlighting (fix: Home stays active at top)
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        let foundActive = false;
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (entry.isIntersecting) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                    foundActive = true;
                }
            }
        });
        // If no section is active (scrolled to very top), highlight Home
        if (!foundActive && window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Handle direct navigation to sections (only for internal links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // else, let external links work normally
        });
    });
}

// Smooth scrolling with easing (only for internal links)
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Professional fade-in animations with Intersection Observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

// Enhanced hover effects for professional interactions
function initializeHoverEffects() {
    // Project cards with sophisticated hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isMobile()) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isMobile()) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });

        // Touch-friendly interactions for mobile
        card.addEventListener('touchstart', function() {
            if (isMobile()) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }
        });

        card.addEventListener('touchend', function() {
            if (isMobile()) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
    });

    // Experience and education items with slide effect
    const experienceItems = document.querySelectorAll('.experience-item, .education-item');
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!isMobile()) {
                this.style.transform = 'translateX(12px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!isMobile()) {
                this.style.transform = 'translateX(0)';
            }
        });
    });

    // Achievement items with icon animation
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        const icon = item.querySelector('i');
        
        item.addEventListener('mouseenter', function() {
            if (icon && !isMobile()) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = '#2d5aa0';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon && !isMobile()) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#3182ce';
            }
        });
    });

    // Skill tags with ripple effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            if (!isMobile()) {
                this.style.transform = 'translateY(-4px) scale(1.05)';
                this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            if (!isMobile()) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
    });
}

// Mobile optimization functions
function initializeMobileOptimizations() {
    // Add touch-friendly button interactions
    const buttons = document.querySelectorAll('.download-resume-btn, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            if (isMobile()) {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            }
        });

        button.addEventListener('touchend', function() {
            if (isMobile()) {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
    });

    // Optimize scroll performance on mobile
    if (isMobile()) {
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Reduce animation complexity on mobile
        const animatedElements = document.querySelectorAll('.section, .project-card, .experience-item');
        animatedElements.forEach(element => {
            element.style.willChange = 'auto';
        });
    }

    // Handle mobile orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate skill bar positions
            handleSkillBarAnimation();
            
            // Recalculate scroll progress
            updateProgressBar();
        }, 500);
    });

    // Add mobile-specific touch gestures
    initializeTouchGestures();
}

// Initialize touch gestures for mobile
function initializeTouchGestures() {
    if (!isMobile()) return;

    let startY = 0;
    let startX = 0;
    let isScrolling = false;

    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        isScrolling = false;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (!isScrolling) {
            const deltaY = Math.abs(e.touches[0].clientY - startY);
            const deltaX = Math.abs(e.touches[0].clientX - startX);
            
            if (deltaY > deltaX && deltaY > 10) {
                isScrolling = true;
            }
        }
    }, { passive: true });

    // Add swipe gestures for navigation (optional)
    document.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const deltaY = e.changedTouches[0].clientY - startY;
        const deltaX = e.changedTouches[0].clientX - startX;
        
        if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
            // Horizontal swipe detected
            if (deltaX > 0) {
                // Swipe right - could navigate to previous section
                console.log('Swipe right detected');
            } else {
                // Swipe left - could navigate to next section
                console.log('Swipe left detected');
            }
        }
    }, { passive: true });
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Professional typing effect with cursor
function initializeTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement && !isMobile()) { // Disable on mobile for better performance
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        nameElement.style.position = 'relative';
        
        // Add cursor element
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.color = '#3182ce';
        cursor.style.animation = 'blink 1s infinite';
        nameElement.appendChild(cursor);
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.insertBefore(document.createTextNode(originalText.charAt(i)), cursor);
                i++;
                setTimeout(typeWriter, 120);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    cursor.remove();
                }, 1000);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 800);
    }
}

// Professional progress bar
function initializeProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(135deg, #1a365d 0%, #2d5aa0 50%, #3182ce 100%);
        z-index: 1000;
        transition: width 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(progressBar);

    // Update progress bar on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Update progress bar function
function updateProgressBar() {
    const progressBar = document.querySelector('div[style*="position: fixed"][style*="top: 0"]');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

// Professional back to top button
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a365d 0%, #2d5aa0 50%, #3182ce 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }, 100));

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile-specific positioning
    if (isMobile()) {
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.width = '45px';
        backToTopBtn.style.height = '45px';
        backToTopBtn.style.fontSize = '1rem';
    }
}

// Professional particle effects
function initializeParticles() {
    if (isMobile()) return; // Disable particles on mobile for performance

    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(49, 130, 206, 0.3);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    container.appendChild(particle);
    
    // Random position and animation
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = 3000 + Math.random() * 4000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    // Animate particle
    animateParticle(particle, duration);
}

function animateParticle(particle, duration) {
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            // Reset particle
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            animateParticle(particle, duration);
            return;
        }
        
        // Move particle
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        
        particle.style.left = (currentX + Math.sin(progress * Math.PI * 2) * 2) + 'px';
        particle.style.top = (currentY + Math.cos(progress * Math.PI * 2) * 2) + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Professional skill animations
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Professional parallax effects
function initializeParallaxEffects() {
    if (isMobile()) return; // Disable parallax on mobile for performance

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.ai-bg-svg-full');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// Professional loading animation
function initializeLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #10192a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(49, 130, 206, 0.3);
        border-top: 3px solid #3182ce;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Email functionality
function sendEmail() {
    const email = 'omkar666@gmail.com';
    const subject = 'Portfolio Contact';
    const body = 'Hello Omkar, I would like to discuss opportunities with you.';
    
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}

// Download resume functionality
function downloadResume() {
    // Create a link element to download the resume
    const link = document.createElement('a');
    link.href = 'Omkar Rathod Resume.pdf'; // Path to your resume PDF
    link.download = 'Omkar_Rathod_Resume.pdf';
    link.style.display = 'none';
    
    // Add link to document and trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Resume download started!', 'success');
}

// Social media functionality
function openSocialMedia(platform) {
    const urls = {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        portfolio: 'https://yourportfolio.com'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Theme toggle functionality
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

function updateThemeStyles(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
        root.style.setProperty('--primary-bg', '#ffffff');
        root.style.setProperty('--card-bg', 'rgba(248, 250, 252, 0.98)');
        root.style.setProperty('--white', '#1f2937');
    } else {
        root.style.setProperty('--primary-bg', '#10192a');
        root.style.setProperty('--card-bg', 'rgba(18, 28, 48, 0.98)');
        root.style.setProperty('--white', '#ffffff');
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.nav-toggle');
    
    if (menu && hamburger) {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#38a169' : '#3182ce'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = skillLevel + '%';
        }, 500);
    });
}

// Handle skill bar animation with intersection observer
function handleSkillBarAnimation() {
    const skillBars = document.querySelectorAll('.bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animate neural network SVG
function animateNeuralNetworkSVG() {
    const nodes = document.querySelectorAll('#nn-nodes circle');
    const lines = document.querySelectorAll('#nn-lines line');
    
    // Animate nodes
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'aiGlowPulse 3s ease-in-out infinite alternate';
        }, index * 200);
    });
    
    // Animate lines
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.strokeDasharray = line.getTotalLength();
            line.style.strokeDashoffset = line.getTotalLength();
            line.style.animation = 'drawLine 2s ease-in-out forwards';
        }, index * 100);
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawLine {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Restore validation
            if (validateContactForm(name, email, subject, message)) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    // Show success message
                    showNotification('Redirecting to WhatsApp...', 'success');
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    // Open WhatsApp with pre-filled message
                    const whatsappMsg = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
                    const whatsappUrl = `https://wa.me/917249398891?text=${whatsappMsg}`;
                    window.open(whatsappUrl, '_blank');
                }, 1200);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Make contact info items clickable
    initializeContactInfoClicks();
}

// Initialize clickable contact info
function initializeContactInfoClicks() {
    // Email click handler
    const emailItems = document.querySelectorAll('.contact-info-item');
    emailItems.forEach(item => {
        const icon = item.querySelector('.contact-icon i');
        const details = item.querySelector('.contact-details p');
        
        if (icon && details) {
            if (icon.classList.contains('fa-envelope')) {
                // Email item
                item.classList.add('clickable');
                item.addEventListener('click', function() {
                    const email = 'omkar666@gmail.com';
                    const subject = 'Portfolio Contact';
                    const body = 'Hello Omkar, I would like to discuss opportunities with you.';
                    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                });
            } else if (icon.classList.contains('fa-phone')) {
                // Phone item
                item.classList.add('clickable');
                item.addEventListener('click', function() {
                    const phone = '+91-XXXXXXXXXX';
                    window.open(`tel:${phone}`);
                });
            } else if (icon.classList.contains('fa-linkedin')) {
                // LinkedIn item
                item.classList.add('clickable');
                item.addEventListener('click', function() {
                    window.open('https://www.linkedin.com/in/omkar-rathod-a93467251/', '_blank');
                });
            } else if (icon.classList.contains('fa-github')) {
                // GitHub item
                item.classList.add('clickable');
                item.addEventListener('click', function() {
                    window.open('https://github.com/omkarrathod23', '_blank');
                });
            }
        }
    });
}

// Validate contact form
function validateContactForm(name, email, subject, message) {
    let isValid = true;
    
    // Validate name
    if (!name || name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject || subject.length < 5) {
        showFieldError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }
    
    // Validate message
    if (!message || message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    clearFieldError(field);
    
    // Add error class
    formGroup.classList.add('error');
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

// Clear field error
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (!value || value.length < 5) {
                showFieldError(fieldName, 'Subject must be at least 5 characters long');
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long');
            }
            break;
    }
}

// Animate hero text reveal
function animateHeroTextReveal() {
    const anims = document.querySelectorAll('.hero-anim');
    anims.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 350 + i * 180);
    });
}

// Floating particles inside header card
function initializeHeaderCardParticles() {
    const container = document.querySelector('.ai-header-card-particles');
    if (!container) return;
    const colors = ['#3182ce', '#805ad5', '#38a169', '#00bcd4'];
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'ai-header-card-particle';
        const size = 16 + Math.random() * 32;
        p.style.width = p.style.height = size + 'px';
        p.style.left = (10 + Math.random() * 80) + '%';
        p.style.top = (10 + Math.random() * 80) + '%';
        p.style.background = `radial-gradient(circle, ${colors[i%colors.length]} 0%, #fff0 100%)`;
        p.style.animationDuration = (6 + Math.random() * 3) + 's';
        p.style.animationDelay = (Math.random() * 2) + 's';
        container.appendChild(p);
    }
}

// 3D tilt effect on profile photo
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

// Typing animation for hero name
function animateHeroNameTyping() {
    const nameEl = document.querySelector('.hero-name span');
    if (!nameEl) return;
    const text = nameEl.textContent;
    nameEl.textContent = '';
    nameEl.style.position = 'relative';
    // Add blinking cursor
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

// Add blink-cursor keyframes
(function addCursorKeyframes() {
    const style = document.createElement('style');
    style.textContent = `@keyframes blink-cursor { 0%,100%{opacity:1;} 50%{opacity:0;} }`;
    document.head.appendChild(style);
})();

// Animated role switcher: AI/ML Engineer <-> Data Science
(function() {
  const roleEl = document.getElementById('hero-role-animated');
  if (!roleEl) return;
  const roles = ['AI/ML Engineer', 'Data Science'];
  let idx = 0;
  setInterval(() => {
    // Fade out
    roleEl.style.transition = 'opacity 0.5s';
    roleEl.style.opacity = 0;
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      roleEl.textContent = roles[idx];
      // Fade in
      roleEl.style.opacity = 1;
    }, 500);
  }, 2500);
})(); 