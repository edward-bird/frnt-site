let cart = {};

function loadCart(){
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        $('.main-cart').html('Корзина пуста');
    }
}

function showCart(){

    if(!isEmpty(cart)){
        $('.main-cart').html('Корзина пуста');
    } else {
        $.getJSON('../goods.json', function (data) {
            let goods = data;
            let out = '';
            for (let id in cart) {
                out += `<div class="basket-cart">`
                out += `<button data-id="${id}" class="delete-goods">x</button>`;
                out += `<img class="basket-cart__img" src="../${goods[id].img}" alt="">`;
                out += `<p class="basket-cart__name">${goods[id].name}</p>`;
                out += `<button data-id="${id}" class="minus-goods button_reright">-</button>`;
                out += `<p class="basket-cart__count">${cart[id]}</p>`;
                out += `<button data-id="${id}" class="plus-goods button_reright">+</button>`;
                out += `<p class="price-cart">${cart[id] * goods[id].cost}</p>`
                out += `</div>`;

            }
            $('.main-cart').html(out);
            $('.delete-goods').on('click', deleteGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
    basketCounter();
}
function plusGoods(){
    let id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusGoods(){
    let id = $(this).attr('data-id');
    cart[id]--;
    if(cart[id] === 0){
        delete cart[id];
    }
    saveCart();
    showCart();
}

function deleteGoods() {
    let id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

$(document).ready(function (){
    loadCart();
})

function isEmpty(object) {
    for(let key in object){
        if (object.hasOwnProperty(key)){
            return true;
        } else {
            return false;
        }
    }
}


function basketCounter(){
    let counter = 0;
    for (let key in cart){
        counter += cart[key];
    }
    $('.basket-counter').html(counter);
}