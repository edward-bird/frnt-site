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
        $('.main-cart').html('<p class="empty">Корзина пуста</p>');
    } else {
        let products = [];
        for (let product in cart){
            products.push(product);
        }
        //console.log(products);
        $.post(
            "../core/core.php",
            {
                "action" : "loadGoods",
                "products" : products

            },
            function (data) {
                let goods = JSON.parse(data);
                console.log(goods);
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
                out += `<div class="order container">
                            <a href="#popup" class="popup__link">ЗАКАЗАТЬ</a>
                        </div>`
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
    $.post(
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
    let street = $('#street').val();
    let house = $('#house').val();
    let flat = $('#flat').val();

    if(ename !== '' && email !== '' && ephone !== '' &&
        street !== '' && house !== '' && flat !== ''){
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
                );
            });

            addToDB(ename, email, ephone, street, house, flat);

        } else {
            alert('Корзина пуста');
        }
    } else {
        alert('Заполните поля');
    }
}

function addToDB(ename, email, ephone, street, house, flat) {
    //let cartP = JSON.stringify(cart);
    let cartP = [];
    for (let product in cart){
        cartP.push([product, cart[product]]);
    }

    $.post(
        "../core/core.php",
        {
            "action" : "setOrdToDB",
            "ename" : ename,
            "email" : email,
            "ephone" : ephone,
            "street" : street,
            "house" : house,
            "flat" : flat,
            "cart" : cartP,
            "delivered" : "1"
        },
        function (data){
            console.log(data);
            $(location).attr('href', "#");
            alert("Заказ оформлен");
        }
    );
}

$(document).ready(function (){
    loadCart();
    $('.send-email').on('click', sendEmail);
    $('.checkbox').on('change', function (){
        $('.delivery').toggle();
    })
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