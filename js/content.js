let id = '';

$(document).ready(function (){
    id = window.location.hash.substring(1);
    start();
})

window.onhashchange = function (){
   id = window.location.hash.substring(1);
   start();
}

function start(){

    switch (location.pathname){
        case "/kitchen":
            kitchen();
            break;
        case "/bedroom":
            bedroom();
            break;
        case "/children":
            children();
            break;
        case "/hallways":
            hallways();
            break;
        case "/livingroom":
            livingroom();
            break;
        case "/office":
            office();
            break;
    }
}
function kitchen(){
    $('.cart-header').html('Кухня');
    switch (id){
        case "":
            getFromDB(11, 13);
            break;
        case "1":
            $('.under-header').html('Кухонные столы');
            getFromDB(11, 11);
            break;
        case "2":
            $('.under-header').html('Кухонные стулья');
            getFromDB(12, 12);
            break;
        case "3":
            $('.under-header').html('Кухни');
            getFromDB(13, 13);
            break;

    }
}

function livingroom(){
    $('.cart-header').html('Гостиная');
    switch (id){
        case "":

            getFromDB(21, 25);
            break;
        case "1":
            $('.under-header').html('Стенки');
            getFromDB(21, 21);
            break;
        case "2":
            $('.under-header').html('Шкафы');
            getFromDB(22, 22);
            break;
        case "3":
            $('.under-header').html('Диваны');
            getFromDB(23, 23);
            break;
        case "4":
            $('.under-header').html('Кресла');
            getFromDB(24, 24);
            break;
        case "5":
            $('.under-header').html('Пуфы');
            getFromDB(25, 25);
            break;

    }
}


function children(){
    $('.cart-header').html('Детская');
    switch (id){
        case "":

            getFromDB(31, 34);
            break;
        case "1":
            $('.under-header').html('Детские кровати');
            getFromDB(31, 31);
            break;
        case "2":
            $('.under-header').html('Детские столы');
            getFromDB(32, 32);
            break;
        case "3":
            $('.under-header').html('Парты');
            getFromDB(33, 33);
            break;
        case "4":
            $('.under-header').html('Двухъярусные кровати');
            getFromDB(34, 34);
            break;
    }
}


function bedroom(){
    $('.cart-header').html('Спальня');
    switch (id){
        case "":

            getFromDB(41, 44);
            break;
        case "1":
            $('.under-header').html('Кровати');
            getFromDB(41, 41);
            break;
        case "2":
            $('.under-header').html('Шкафы');
            getFromDB(42, 42);
            break;
        case "3":
            $('.under-header').html('Гардеробные');
            getFromDB(43, 43);
            break;
        case "4":
            $('.under-header').html('Комоды');
            getFromDB(44, 44);
            break;
    }
}



function hallways(){
    $('.cart-header').html('Прихожие');
    switch (id){
        case "":

            getFromDB(51, 54);
            break;
        case "1":
            $('.cart-header').html('Прихожие');
            getFromDB(51, 51);
            break;
        case "2":
            $('.cart-header').html('Обувницы');
            getFromDB(52, 52);
            break;
        case "3":
            $('.cart-header').html('Ключницы');
            getFromDB(53, 53);
            break;
        case "4":
            $('.cart-header').html('Подставки под зонты');
            getFromDB(54, 54);
            break;
    }
}

function office(){
    $('.cart-header').html('Офисная мебель');
    getFromDB(61, 61);
}

function getFromDB(rangeStart, rangeEnd){
    $.post(
        "../core/core.php",
        {
            "action" : "getGoodsInRange",
            "rangeStart" : rangeStart,
            "rangeEnd" : rangeEnd

        },
        goodsOut
    );
}
