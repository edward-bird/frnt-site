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
        $.post(
            "../core/core.php",
            {
                "action" : "loadGoods"

            },
            function (data) {
                let goods = JSON.parse(data);
                let out = '';
                for (let id in cart) {
                    out += `<div class="basket-cart">`
                    out += `<button data-id="${id}" class="delete-goods">x</button>`;
                    out += `<img class="basket-cart__img" src="../assets/images/product/${goods[id].img}" alt="">`;
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
            }
        );
    }
    basketCounter();
}

function getGoods(callback){
    let goods = $.post(
        "../core/core.php",
        {
            "action" : "loadGoods"
        },
        function (data){
            callback(data);
        }
    );
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




function sendEmail(){
    let ename = $('#ename').val();
    let email = $('#email').val();
    let ephone = $('#ephone').val();

    if(ename !== '' && email !== '' && ephone !== ''){
        if(isEmpty(cart)){
            getGoods(function (data){
                $.post(
                    "../core/mail.php",
                    {
                        "goods" : data,
                        "ename" : ename,
                        "email" : email,
                        "ephone" : ephone,
                        "cart" : cart
                    },
                    function (data){

                    }
                );
            });
            addToDB(ename, email, ephone);

        } else {
            alert('Корзина пуста');
        }
    } else {
        alert('Заполните поля');
    }
}

function addToDB(ename, email, ephone) {
    let cartP = JSON.stringify(cart);
    console.log(cartP);
    $.post(
        "../core/core.php",
        {
            action : "setOrdToDB",
            ename : ename,
            email : email,
            ephone : ephone,
            cart : cartP
        },
        function (){
            $(location).attr('href', "#");
            alert("Заказ оформлен");
        }
    );
}

$(document).ready(function (){
    loadCart();
    $('.send-email').on('click', sendEmail);
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