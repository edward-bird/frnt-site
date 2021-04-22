
function init() {
    $.getJSON("../goods.json", goodsOut);

}
function goodsOut(data){
    console.log(data);
    let out = '';
    for (let key in data){
        out+= '<div class="cart">';
        out+= `<p class="name">${data[key].name}</p>`;
        out+= `<img src="../${data[key].img}" alt="">`;
        out+= `<div class="cost">${data[key].cost}</div>`;
        out+= '</div>';
    }
    $('.goods-out').html(out);
}

$(document).ready(function (){
    init();
})