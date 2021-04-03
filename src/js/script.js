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