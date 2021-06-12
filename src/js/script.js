/*
Nav Menu
*/
const links = document.querySelectorAll('.nav-link');
const navBar = document.querySelector('.navbar');
const logo = document.querySelector('#logo');
const homeLink = document.querySelector('#home-link');
const projectsLink = document.querySelector('#projects-link');
const aboutLink = document.querySelector('#about-link');
const contactLink = document.querySelector('#contact-link');

// switch the active nav link
links.forEach(link => link.addEventListener('click', e => navigateLink(e.target)));
function navigateLink(link) {    
    if (link.classList.contains('active')) return;
    else {
        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');        
    }
}

// resize when scrolled down
// update active link in nav menu if different section is reached
window.onscroll = () => {
    resizeNav();
    updateLinks();
}
function resizeNav() {
    const heading = document.querySelector('#hi').offsetTop; 
    if (window.scrollY > heading) {        
        navBar.classList.add('navbar-scroll-background');
        logo.className = 'logo-scroll-size';
        links.forEach(link => link.classList.add('nav-link-scroll-size'));
    }
    else {
        navBar.classList.remove('navbar-scroll-background');
        logo.className = '';
        links.forEach(link => link.classList.remove('nav-link-scroll-size'));
    }
}

function updateLinks() {
    const projectSection = document.querySelector('#projects').offsetTop;
    const aboutSection = document.querySelector('#about').offsetTop;
    const contactSection = document.querySelector('#contact').offsetTop;
    if (window.scrollY >= contactSection)
        navigateLink(contactLink);
    else if (window.scrollY >= aboutSection)
        navigateLink(aboutLink);
    else if (window.scrollY >= projectSection)
        navigateLink(projectsLink);
    else
        navigateLink(homeLink);
}

resizeNav(); // resize on load if necessary
updateLinks(); // get correct active link on load

/*
Home animation
*/

const xunchuan = document.querySelector('#xunchuan');
const web = document.querySelector('#web');

// switches the animation every 2 seconds
setInterval(() => {    
    swapXunchuan();
    swapWeb();
}, 2000)

// swap classes
function swapXunchuan() {
    if (xunchuan.classList.contains('scroll-in')) {
        xunchuan.classList.add('scroll-out');
        xunchuan.classList.remove('scroll-in');        
    }
    else {
        xunchuan.classList.add('scroll-in');
        xunchuan.classList.remove('scroll-out');        
    }
}

// swap classes
function swapWeb() {    
    if (web.classList.contains('scroll-in')) {
        web.classList.add('scroll-out');
        web.classList.remove('scroll-in');       
    }
    else {
        web.classList.add('scroll-in');
        web.classList.remove('scroll-out');        
    }
}