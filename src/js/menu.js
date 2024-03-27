const navMenu = document.querySelector('.menu');
const navMenuList = document.querySelector('.menu__list');

window.addEventListener('resize', function (e) {
    const windowWidth = e.target.innerWidth;
    if (windowWidth > 1024) {
        navMenuList.classList.remove('visible');
    }
})

navMenu.addEventListener('click', toggleMenu);
function toggleMenu() {
    navMenuList.classList.toggle('visible');
}