/*
Nav Menu
*/
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', navigateLink);
})

// switch the active nav link
function navigateLink(e) {    
    if (e.target.classList.contains('active')) return;
    else {
        links.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');        
    }
}

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