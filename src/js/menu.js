const menuBurger = document.querySelector('.menu__burger');
const menuList = document.querySelector('.menu__list');

window.addEventListener('resize', function (e) {
    const windowWidth = e.target.innerWidth;
    if (windowWidth > 1024) {
        menuList.classList.remove('visible');
    }
})

menuBurger.addEventListener('click', toggleMenu);
function toggleMenu() {
    menuList.classList.toggle('visible');
}