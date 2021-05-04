let cart = {};


function init() {
    //$.getJSON("../goods.json", goodsOut);
    $.post(
        "../admin/core.php",
        {
            "action" : "loadGoods"

        },
        goodsOut
    );
}

function goodsOut(data){
    data = JSON.parse(data);
    let out = '';
    for (let key in data){
        out+= '<div class="cart">';
        out+= `<p class="name">${data[key].name}</p>`;
        out+= `<img src="../assets/images/product/${data[key].img}" alt="">`;
        out+= `<div class="cost">${data[key].cost}</div>`;

        out+= '<div class="cart__buttons">';
        out+= '<button class="liked"><img src="../assets/images/heart__icon.png" alt=""></button>';
        out+= `<button class="add-to-cart" data-id="${key}">В корзину</button>`;
        out+= '</div>';
        out+= '</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);

}


function addToCart(){
    let id = $(this).attr('data-id');
    if (cart[id] === undefined){
        cart[id] = 1;
    } else {
        cart[id]++;
    }
    console.log(cart);
    //showMiniCart();
    saveCart();
    basketCounter()

}

function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart(){
    let out = "";
    for (let key in cart){
        out += key + ' ---- ' + cart[key] + '<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart(){
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        //showMiniCart();
    }
}


function basketCounter(){
    let counter = 0;
    for (let key in cart){
        counter += cart[key];
    }
    $('.basket-counter').html(counter);
}

$(document).ready(function (){
    init();
    loadCart();
    basketCounter();
})