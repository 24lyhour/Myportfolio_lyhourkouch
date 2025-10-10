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
