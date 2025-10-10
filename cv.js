// ==================== SCROLL REVEAL ANIMATIONS ====================
const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

// Home Section
sr.reveal('.home-img', { origin: 'left', delay: 300 });
sr.reveal('.home-content h1', { origin: 'top', delay: 400 });
sr.reveal('.home-content h3', { origin: 'right', delay: 500 });
sr.reveal('.home-content p', { origin: 'bottom', delay: 600 });
sr.reveal('.social-icons', { origin: 'bottom', delay: 700, interval: 100 });
sr.reveal('.home-buttons', { origin: 'bottom', delay: 800 });

// About Section
sr.reveal('.about-img', { origin: 'left', delay: 300 });
sr.reveal('.about-content h3', { origin: 'top', delay: 400 });
sr.reveal('.about-intro', { origin: 'right', delay: 500 });
sr.reveal('.detail-item', { origin: 'bottom', delay: 300, interval: 100 });
sr.reveal('.stat-box', { origin: 'bottom', delay: 400, interval: 150 });
sr.reveal('.about-buttons', { origin: 'bottom', delay: 600 });

// Services Section
sr.reveal('.service-box', { origin: 'bottom', delay: 300, interval: 200 });

// Education Section
sr.reveal('.timeline-item', { origin: 'bottom', delay: 300, interval: 200 });

// Skills Section
sr.reveal('.skill-box', { origin: 'left', delay: 200, interval: 100 });

// Contact Section
sr.reveal('.contact-form', { origin: 'left', delay: 300 });
sr.reveal('.contact-info', { origin: 'right', delay: 300 });

// Section Headings
sr.reveal('.heading', { origin: 'top', delay: 200 });

// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    if (menuIcon && navbar) {
        // Toggle menu
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navbar.classList.toggle('active');
            
            // Toggle icon
            if (menuIcon.classList.contains('fa-bars')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        });
        
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuIcon.contains(e.target) && !navbar.contains(e.target)) {
                navbar.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        });
    }
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');
const navLinksScroll = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksScroll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Trigger counter animation when About section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target, 2000);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(aboutSection);
}

// ==================== SKILL BARS ANIMATION ====================
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.width = bar.classList.contains('nuxt') ? '75%' :
                                     bar.classList.contains('vue') ? '80%' :
                                     bar.classList.contains('html') ? '95%' :
                                     bar.classList.contains('css') ? '90%' :
                                     bar.classList.contains('javascript') ? '85%' :
                                     bar.classList.contains('tailwind') ? '88%' :
                                     bar.classList.contains('laravel') ? '70%' :
                                     bar.classList.contains('shadcn') ? '75%' : '0%';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// ==================== CONTACT FORM VALIDATION ====================
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        // Validation
        if (!name || !email || !phone || !subject || !message) {
            showAlert('Please fill in all fields!', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address!', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone)) {
            showAlert('Please enter a valid phone number!', 'error');
            return;
        }
        
        // Success
        showAlert('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 10rem;
        right: 2rem;
        background: ${type === 'success' ? 'rgba(0, 255, 135, 0.1)' : 'rgba(255, 0, 110, 0.1)'};
        border: 2px solid ${type === 'success' ? 'var(--main-color)' : 'var(--accent-color)'};
        border-radius: 1rem;
        padding: 2rem;
        z-index: 10000;
        animation: slideIn 0.5s ease;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    `;
    
    const alertContent = alert.querySelector('.alert-content');
    alertContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 1.6rem;
        color: var(--text-color);
    `;
    
    const icon = alert.querySelector('i');
    icon.style.cssText = `
        font-size: 2.5rem;
        color: ${type === 'success' ? 'var(--main-color)' : 'var(--accent-color)'};
    `;
    
    document.body.appendChild(alert);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => alert.remove(), 500);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== TYPING EFFECT ====================
const typingText = document.querySelector('.home-content h3');
if (typingText) {
    const text = typingText.getAttribute('data-text');
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            typingText.textContent = text.slice(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                setTimeout(type, 1000);
            }, 2000);
        }
    }
    
    // Uncomment to enable custom typing effect
    // type();
}

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-img, .glow-effect');
    
    parallaxElements.forEach((element, index) => {
        const speed = index === 0 ? 0.3 : 0.5;
        if (scrolled < window.innerHeight) {
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// ==================== CURSOR TRAIL EFFECT (OPTIONAL) ====================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    // Remove old trails
    cursorTrail = cursorTrail.filter(point => Date.now() - point.time < 1000);
});

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // Fade in body
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== BUTTON RIPPLE EFFECT ====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    width: 5rem;
    height: 5rem;
    background: linear-gradient(45deg, var(--main-color), var(--secondary-accent));
    border: none;
    border-radius: 50%;
    color: var(--bg-color);
    font-size: 2rem;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: 0.3s ease;
    box-shadow: 0 5px 20px rgba(0, 255, 135, 0.3);
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
    this.style.boxShadow = '0 8px 30px rgba(0, 255, 135, 0.5)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = '0 5px 20px rgba(0, 255, 135, 0.3)';
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showAlert('🎮 Konami Code Activated! You found the Easter Egg!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
