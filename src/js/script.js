/*
Intro Animation
*/
const animationContainer = document.querySelector('#animation-container');

const animation = bodymovin.loadAnimation({
  container: animationContainer,
  path: './animation/logo_animation.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Intro",
})

// flag for when the bodymovin tetris animation finishes playing
let animationFinished = false;

// before making the animation container visible
// play the animation really quickly for first time so that when it plays again it is smooth
animation.setSpeed(100);
animation.play();

// wait for the animation to be loaded in to the DOM
animation.addEventListener('DOMLoaded', () => {
    // make the animation container visible           
    animationContainer.style.visibility = 'visible';

    // set short timeout and play the real animation this time 
    setTimeout(() => {                       
        animation.setSpeed(1.1);
        animation.goToAndPlay(0);
        animationFinished = true;
    }, 200)    
});

// wait for the animation complete event to fire
animation.addEventListener('complete', () => {
    // only continue after the animation plays for the second time when the flag gets set    
    if (animationFinished) {
        // hide the initial container and reveal the rest of the site        
        animationContainer.style.display = 'none';        
        document.querySelector('nav').style.visibility = 'visible';
        document.querySelector('main').style.display = 'block';
        document.querySelector('footer').style.visibility = 'visible';

        // animate in the initial elements
        beginEntranceAnimation();    
    }
})

// animates initial elements on home page
function beginEntranceAnimation() {
    const navLinks = document.querySelector('.navbar-nav');
    const hamburgerMenu = document.querySelector('.navbar-toggler'); // for smaller screens
    const navIcon = document.querySelector('#logo');
    const hi = document.querySelector('#hi');
    const im = document.querySelector('#im');
    const xunchuan = document.querySelector('#xunchuan');
    const web = document.querySelector('#web');

    navLinks.classList.add('nav-bar-entrance');
    hamburgerMenu.classList.add('nav-bar-entrance');
    navIcon.classList.add('logo-entrance');
    hi.classList.add('hi-entrance');
    im.classList.add('im-entrance');

    // wait for "i'm" to animate in
    setTimeout(() => {
        // scroll "xunchuan" in
        xunchuan.classList.add('scroll-in');

        // after scrolling in "xunchuan"
        // begin the infintie scrolling animation after 2s
        setTimeout(() => {
            xunchuan.classList.remove('scroll-in');
            xunchuan.classList.add('scroll-out');
            web.classList.add('scroll-in');
            loopScrollAnimations();
        }, 2000);        
    }, 2600);    
}

// set 2s interval to loop the scrolling text animations
function loopScrollAnimations() {
    const xunchuan = document.querySelector('#xunchuan');
    const web = document.querySelector('#web');

    // swap animation classes
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
    
    // swap animation classes
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

    setInterval(() => {    
        swapXunchuan();
        swapWeb();
    }, 2000)
}


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
    if (window.scrollY >= contactSection - 5)
        navigateLink(contactLink);
    else if (window.scrollY >= aboutSection - 5)
        navigateLink(aboutLink);
    else if (window.scrollY >= projectSection - 5)
        navigateLink(projectsLink);
    else
        navigateLink(homeLink);
}


/*
Contact Message Send
*/


// use formSubmit to send form to email inbox
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const url = form.action;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        })
        const parsed = await response.json();

        if (parsed.success)
            window.alert('Message sent!');
        
        else
            throw new Error('An error occurred sending this message.')

        form.reset(); 
    }
    catch(err) {
        window.alert('Oops, an error occurred.')
    }    
}
const contactForm = document.querySelector('form');
contactForm.onsubmit = handleFormSubmit;

/*
Footer Copy Email to Clipboard
*/
const EMAIL_ADDRESS = 'hello@xunchuanliu.com';
const copyButton = document.querySelector('.copy-email-button');
copyButton.onclick = copyEmail;

// copy the email address to the clipboard
async function copyEmail() {
    try {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        copyButton.textContent = 'Copied!';
        copyButton.disabled = true;
        setTimeout(() => {
            copyButton.textContent = 'Copy email';
            copyButton.disabled = false;
        }, 4000);
    }
    catch (err) {
        window.alert('Failed to copy');
    }
}

