
$(document).ready(function (){
    let id = window.location.hash.substring(1);
    if (id === ''){
        document.location.href = "shop";
    } else {
        init(id);
        basketCounter();
    }

})


function init(id) {
    $.post(
        "../core/core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id

        },
        goodsSingleOut
    );
}

function goodsSingleOut(data){
    data = JSON.parse(data);
    console.log(data);
    let out = '';
    out+= '<div class="single_goods">';
    out+= `<h1 class="name">${data.name}</h1>`;
    out+= `<img src="../assets/images/product/${data.img}" alt="">`;
    out+= `<div class="description-container">`
    out+= `<div class="goods-description">${data.description}</div>`;
    out+= `<div class="cost">${data.cost}</div>`;
    out+= '<div class="goods__button">';
    out+= `<button class="add-to-cart" data-id="${data.id}">В корзину</button>`;
    out+= `</div>`;
    out+= '</div>';
    out+= '</div>';
    $('.goods_single-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}


