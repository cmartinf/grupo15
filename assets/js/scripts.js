
/*
 * FUNCTION SEARCH FORM
*/
const searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

/*
 * FUNCTION CART
*/
const cartBtn = document.querySelector('#cart-btn');
document.getElementById("cart-btn").addEventListener("click", () => {
    window.location.href = "pages/products.html";
});

const loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>
{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');

}

const navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}


