const orderBtn = document.querySelector('.order__form-button');
const orderForm = document.querySelector('.order__form');
const url = '/mocks/sendOrder.json';
let formIsValid = false;

orderBtn.addEventListener('click', function (e) {
    e.preventDefault();

    console.log(e, 'sfsfsf');
    validateForm();
    if (formIsValid) {
        sendForm();
    }
});

function validateForm() {
    console.log('validate');
    console.dir(orderForm);
    formIsValid = true;
}

function sendForm() {
    fetch(url)
        .then((response) => {
        console.log(response);
        
        if (response.status === 200) {
            modal.style.display = 'block';
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        const p = document.createElement("p");
        p.innerHTML = data.text;
        modalBody.appendChild(p);

    });
}