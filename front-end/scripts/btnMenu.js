const btnMenu = document.querySelector('.btn-menu');
const sidebar = document.querySelector('.sidebar')
let menuOpen = false;

btnMenu.addEventListener('click', () =>{
    if (!menuOpen) {
        btnMenu.classList.add('open');
        sidebar.classList.add('open')
        menuOpen = true;
    }
    else {
        btnMenu.classList.remove('open');
        sidebar.classList.remove("open");
        menuOpen = false;
    } 
}) ;