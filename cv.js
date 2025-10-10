// ScrollReveal Animations
const sr = ScrollReveal({
    distance: '100px',
    duration: 1000,
    delay: 100,
    reset: true,
    easing: 'ease-in-out',
});

// Home Section Animations
sr.reveal('.home-img', { 
    delay: 200, 
    origin: 'left',
    scale: 0.8
});

sr.reveal('.home-content', { 
    delay: 250, 
    origin: 'right',
    distance: '150px'
});

sr.reveal('.social-icon', { 
    delay: 300, 
    origin: 'bottom',
    interval: 100
});

sr.reveal('.btn', { 
    delay: 350, 
    origin: 'bottom',
    scale: 0.8
});

// Section Headings
sr.reveal('.heading', {
    delay: 200,
    origin: 'top',
    distance: '80px'
});

// Services Section
sr.reveal('.services-box', {
    delay: 200,
    origin: 'bottom',
    interval: 200,
    distance: '120px'
});

// Education Section
sr.reveal('.content', {
    delay: 200,
    origin: 'bottom',
    interval: 300,
    distance: '100px'
});

sr.reveal('.tag', {
    delay: 250,
    origin: 'left',
    distance: '80px'
});

// Skills Section
sr.reveal('.skill', {
    delay: 200,
    origin: 'top'
});

sr.reveal('.bar', {
    delay: 200,
    origin: 'left',
    interval: 100,
    distance: '80px'
});

// Contact Section
sr.reveal('.contact', {
    delay: 200,
    origin: 'bottom'
});

sr.reveal('input', {
    delay: 250,
    origin: 'left',
    interval: 100,
    distance: '60px'
});

sr.reveal('textarea', {
    delay: 400,
    origin: 'right',
    distance: '60px'
});

// Text Elements
sr.reveal('h1', {
    delay: 300,
    origin: 'top',
    distance: '60px'
});

sr.reveal('h3', {
    delay: 350,
    origin: 'right',
    distance: '80px'
});

sr.reveal('p', {
    delay: 400,
    origin: 'bottom',
    distance: '50px'
});

// Mobile Menu Functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav ul li a');

// Toggle mobile menu
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when clicking on a link
navlinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Debounce function for performance optimization
let debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

// Active navigation link on scroll
window.onscroll = debounce(() => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav ul li a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Add scrolled class to header
    let header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 100);

// Smooth scrolling for anchor links
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

// Skill bar animation on scroll
const animateSkillBars = () => {
    const skillSection = document.querySelector('.skill');
    const skillBars = document.querySelectorAll('.progress-line span');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.parentElement.classList.contains('nuxt') ? '70%' :
                                     bar.parentElement.classList.contains('vue') ? '75%' :
                                     bar.parentElement.classList.contains('html') ? '90%' :
                                     bar.parentElement.classList.contains('css') ? '85%' :
                                     bar.parentElement.classList.contains('javascript') ? '80%' :
                                     bar.parentElement.classList.contains('laravel') ? '65%' :
                                     bar.parentElement.classList.contains('tailwind') ? '88%' :
                                     bar.parentElement.classList.contains('shadcn') ? '70%' : '0%';
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (skillSection) {
        observer.observe(skillSection);
    }
};

// Initialize skill bar animation
animateSkillBars();

// Form validation and submission
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="number"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Success message (in a real application, this would send data to a server)
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect (optional - for enhanced visual appeal)
let cursor = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
});

// Add parallax effect to home section
const homeSection = document.querySelector('.home');
if (homeSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.home-img, .home-content');
        
        parallaxElements.forEach((element, index) => {
            const speed = index === 0 ? 0.5 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}
