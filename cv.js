// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
const sr = ScrollReveal({
    distance: '60px',
    duration: 1200,
    delay: 100,
    reset: false,
    easing: 'cubic-bezier(0.5, 0, 0, 1)'
});

// Home Section
sr.reveal('.home-img', { origin: 'left', delay: 200 });
sr.reveal('.greeting', { origin: 'top', delay: 300 });
sr.reveal('.home-content h1', { origin: 'top', delay: 400 });
sr.reveal('.typing-wrapper', { origin: 'right', delay: 500 });
sr.reveal('.description', { origin: 'bottom', delay: 600 });
sr.reveal('.social-icon', { origin: 'bottom', delay: 700 });
sr.reveal('.btn-group', { origin: 'bottom', delay: 800 });

// Section Headings
sr.reveal('.heading', { origin: 'top', delay: 100 });

// Services Section
sr.reveal('.services-box', { origin: 'bottom', delay: 200, interval: 150 });

// Education Section
sr.reveal('.timeline-item', { origin: 'bottom', delay: 200, interval: 200 });

// Skills Section
sr.reveal('.skills-text', { origin: 'left', delay: 200 });
sr.reveal('.skill-bar', { origin: 'right', delay: 300 });
sr.reveal('.bar', { origin: 'left', delay: 100, interval: 100 });

// Frameworks Section
sr.reveal('.framework-card', { origin: 'bottom', delay: 200, interval: 150 });

// ==================== FRAMEWORK PROGRESS BARS ANIMATION ====================
const frameworksSection = document.querySelector('.frameworks');
let frameworkBarsAnimated = false;

function animateFrameworkBars() {
    if (frameworkBarsAnimated) return;

    const frameworkBars = document.querySelectorAll('.framework-progress-bar span');
    frameworkBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            bar.style.width = progress + '%';
        }
    });

    frameworkBarsAnimated = true;
}

if (frameworksSection) {
    const frameworkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateFrameworkBars, 500);
            }
        });
    }, { threshold: 0.2 });

    frameworkObserver.observe(frameworksSection);
}

// Contact Section
sr.reveal('.contact-card', { origin: 'left', delay: 200, interval: 150 });
sr.reveal('.contact-form', { origin: 'right', delay: 300 });

// Footer
sr.reveal('.footer-content', { origin: 'bottom', delay: 200 });

// ==================== TYPING EFFECT ====================
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const text = typedTextElement.getAttribute('data-text') || 'Frontend Developer';
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            if (isDeleting) {
                typedTextElement.textContent = text.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = text.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === text.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }
});

// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navbar.classList.toggle('active');

            if (menuIcon.classList.contains('fa-bars')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-xmark');
            });
        });

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

function updateActiveLink() {
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
}

window.addEventListener('scroll', updateActiveLink);

// ==================== HEADER SCROLL EFFECT ====================
const header = document.querySelector('.header');

function updateHeader() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateHeader);

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SKILL BARS ANIMATION ====================
const skillSection = document.querySelector('.skill');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;

    const progressBars = document.querySelectorAll('.progress-line span');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') || bar.parentElement.classList[1];
        let width = '0%';

        if (bar.getAttribute('data-progress')) {
            width = bar.getAttribute('data-progress') + '%';
        } else if (bar.parentElement.classList.contains('nuxt')) {
            width = '70%';
        } else if (bar.parentElement.classList.contains('vue')) {
            width = '75%';
        } else if (bar.parentElement.classList.contains('html')) {
            width = '95%';
        } else if (bar.parentElement.classList.contains('css')) {
            width = '90%';
        } else if (bar.parentElement.classList.contains('javascript')) {
            width = '80%';
        } else if (bar.parentElement.classList.contains('laravel')) {
            width = '65%';
        } else if (bar.parentElement.classList.contains('tailwind')) {
            width = '88%';
        } else if (bar.parentElement.classList.contains('shadcn')) {
            width = '70%';
        } else if (bar.parentElement.classList.contains('typescript')) {
            width = '75%';
        } else if (bar.parentElement.classList.contains('flutter')) {
            width = '60%';
        }

        bar.style.width = width;
    });

    skillsAnimated = true;
}

if (skillSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillSection);
}

// ==================== TIMELINE ANIMATION ====================
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ==================== CONTACT FORM VALIDATION ====================
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !phone || !subject || !message) {
            showAlert('Please fill in all fields!', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address!', 'error');
            return;
        }

        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(phone)) {
            showAlert('Please enter a valid phone number!', 'error');
            return;
        }

        showAlert('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
    });
}

// ==================== ALERT FUNCTION ====================
function showAlert(message, type) {
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="alert-close"><i class="fas fa-times"></i></button>
        </div>
    `;

    alert.style.cssText = `
        position: fixed;
        top: 10rem;
        right: 2rem;
        background: ${type === 'success' ? 'rgba(0, 255, 135, 0.15)' : 'rgba(255, 0, 110, 0.15)'};
        border: 2px solid ${type === 'success' ? '#00ff87' : '#ff006e'};
        border-radius: 1.5rem;
        padding: 2rem 2.5rem;
        z-index: 10000;
        animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    `;

    const alertContent = alert.querySelector('.alert-content');
    alertContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 1.5rem;
        color: #ffffff;
    `;

    const icon = alert.querySelector('.alert-content > i');
    icon.style.cssText = `
        font-size: 2.5rem;
        color: ${type === 'success' ? '#00ff87' : '#ff006e'};
        flex-shrink: 0;
    `;

    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
        padding: 0.5rem;
        margin-left: 1rem;
        font-size: 1.4rem;
        transition: color 0.3s;
    `;

    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    });

    document.body.appendChild(alert);

    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
}

// Add alert animation styles
const alertStyle = document.createElement('style');
alertStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
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
document.head.appendChild(alertStyle);

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .services-box, .social-icon a, .btn');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

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
            background: rgba(255, 255, 255, 0.4);
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

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImg = document.querySelector('.home-img');
    const glowEffect = document.querySelector('.glow-effect');

    if (homeImg && scrolled < window.innerHeight) {
        homeImg.style.transform = `translateY(${scrolled * 0.2}px)`;
    }

    if (glowEffect && scrolled < window.innerHeight) {
        glowEffect.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
    }
});

// ==================== TILT EFFECT ====================
const tiltElements = document.querySelectorAll('[data-tilt]');

if (window.innerWidth > 768) {
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join('') === konamiSequence.join('')) {
        showAlert('Konami Code Activated! You found the Easter Egg!', 'success');
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

// ==================== PERFORMANCE OPTIMIZATION ====================
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
    updateActiveLink();
    updateHeader();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add show class to timeline items after a delay
    setTimeout(() => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 200);
        });
    }, 500);

    // Initialize skill bars with 0 width
    const progressBars = document.querySelectorAll('.progress-line span');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// ==================== MAGNETIC BUTTON EFFECT ====================
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

if (window.innerWidth > 768) {
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== FLOATING ICON INTERACTION ====================
const floatingIcons = document.querySelectorAll('.float-icon');

floatingIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.zIndex = '100';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.zIndex = '';
    });
});

// ==================== COUNTER ANIMATION FOR PERCENTAGES ====================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 30);
}

const percentageElements = document.querySelectorAll('.percentage');
let countersAnimated = false;

if (skillSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                percentageElements.forEach(el => {
                    const target = parseInt(el.textContent);
                    el.textContent = '0%';
                    setTimeout(() => animateCounter(el, target), 300);
                });
                countersAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    counterObserver.observe(skillSection);
}

// ==================== SMOOTH SCROLL PROGRESS ====================
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00ff87, #00d9ff, #a855f7);
    z-index: 10001;
    transition: width 0.1s ease;
    border-radius: 0 2px 2px 0;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ==================== IMAGE LAZY LOADING ENHANCEMENT ====================
const profileImg = document.querySelector('.home-img img');
if (profileImg) {
    profileImg.addEventListener('load', () => {
        profileImg.style.animation = 'fadeIn 0.5s ease forwards';
    });
}

// Add fade in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(fadeStyle);

// ==================== SECTION VISIBILITY EFFECTS ====================
const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.1 });

allSections.forEach(section => {
    sectionObserver.observe(section);
});

// Add section visible styles
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    section {
        opacity: 0.9;
        transition: opacity 0.5s ease;
    }
    section.section-visible {
        opacity: 1;
    }
`;
document.head.appendChild(sectionStyle);
