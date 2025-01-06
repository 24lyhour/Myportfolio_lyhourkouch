
const sr = ScrollReveal({
   distance: '100px',
   duration: 1000,
   delay:100,
   reset: true, // Corrected by adding a comma here
   easing: 'ease-in-out',
 });
 
 sr.reveal('.home-img', { delay: 200, origin: 'left' }); 
 sr.reveal('home-centent', { delay: 250, origin: 'right' }); 
 sr.reveal('.social-icon',{ delay: 300, origin: 'bottom' });
 sr.reveal('.heading',{delay:350,origin:'top'});
 sr.reveal('.services-box',{delay:400, origin:'bottom'});
 sr.reveal('.education',{delay:450, origin:'top'});

 sr.reveal('.skill',{delay:500, origin:'right'});
 sr.reveal('.bar',{delay:450, origin:'top'});
 sr.reveal('.contact',{delay:500, origin:'bottom'});
 sr.reveal('.social',{delay:550, origin:'top'});
 sr.reveal('.list',{delay:550, origin:'bottom'});
 sr.reveal('p',{delay:450, origin:'top'});
 sr.reveal('.btn',{delay:450, origin:'top'});
 sr.reveal('h1',{delay:450, origin:'top'});
 sr.reveal('h3', {delay:500,origin:'right'});
 sr.reveal('input', {delay:500,origin:'top'});



//  education

sr.reveal('.content ',{delay:300, origin:'right'});
sr.reveal('.tag ',{delay:350, origin:'left'});
// sr.reveal('.container', {delay:400, origin:'top'});


 







let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav ul li a');

let debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

window.onscroll = debounce(() => {
   sections.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');
      
      if (top >= offset && top < offset + height){
        navlinks.forEach(link => {
           link.classList.remove('active');
           document.querySelector('header nav ul li a[href*="' + id + '"]').classList.add('active');
        });
      }
   });
}, 100); // Debounce delay set to 100ms

menuIcon.onclick = () => {
     menuIcon.classList.toggle('bx-x');
     navbar.classList.toggle('active');
};
