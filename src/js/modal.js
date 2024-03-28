const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal__body');
const modalBg = document.querySelector('.modal__bg');
const modalCloseIcon = document.querySelector('.modal__close-icon');

modalBg.addEventListener('click', closeModal);
modalCloseIcon.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
};