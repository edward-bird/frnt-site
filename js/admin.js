function init(){
    let out = '<div class="container">\n' +
        '\n' +
        '    <div class="admin-panel">\n' +
        '        <div class="goods-out"></div>\n' +
        '        <h2 class="admin-panel__h">Товар</h2>\n' +
        '        <p>Имя <input type="text" id="gname"></p>\n' +
        '        <p>Стоимость <input type="text" id="gcost"></p>\n' +
        '        <p>Описание <textarea id="gdescription"></textarea></p>\n' +
        '        <p>Изображение <input type="text" id="gimg"></p>\n' +
        '        <div class="img_goods"></div>\n' +
        '        <p>Выбрать/изменить категорию' +


        '       <select class="order-select"> ' +
        '       </select> ' +
        '        </p>\n' +
        '        <input type="hidden" id="gid">\n' +
        '        <button class="add-to-db">Обновить</button>\n' +
        '    </div>\n' +
        '    <div class="ord_name">\n' +
        '        <h1>ЗАКАЗЫ: </h1>\n' +
        '    </div>\n' +
        '    <div class="orders">\n' +
        '\n' +
        '    </div>\n' +
        '\n' +
        '\n' +
        '</div>';
    $('.admin').html(out);
    getOrderSelector();
    $.post(
        "../core/core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data){

    data = JSON.parse(data);
    console.log(data);
    let out = '<select>';
    out += '<option data-id="0">Новый товар</option>';
    for (let id in data){
        out += `<option class="admin-panel__option" data-id="${id}">${data[id].name}</option>`;
    }
    out += `</select>`;
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods(){
    let id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);

    selectOneGoods(id, function (data){
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        $('#gname').val(data.name);
        $('#gcost').val(data.cost);
        $('#gdescription').val(data.description);
        $(`.order-select option[value=${data.ord}]`).prop("selected", true);
        $('#gimg').val(data.img);
        $('.img_goods').html(`<img src="../assets/images/product/${data.img}" alt=""/>`);
        $('#gid').val(data.id);
    });
}
function getOrderSelector(){
    $.post(
        "../core/core.php",
        {
            "action" : "getCategories"
        },
        function (data){
            data = JSON.parse(data);
            for (let id in data){
                $('.order-select').append(`<option value="${data[id].id_category}">${data[id].category}</option>`)
            }
        }
    )
}

function selectOneGoods(id, func){
    $.post(
        "../core/core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        func
    );
}

function saveToDb(){
    let id = $('#gid').val();
    console.log($('.order-select').val());
    if (id !== ''){
        $.post(
            "../core/core.php",
            {
                "action" : "updateGoods",
                "gid" : id,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdescription" : $('#gdescription').val(),
                "gorder" : $('.order-select').val(),
                "gimg" : $('#gimg').val(),
            },
            function (data){

                if (data == 1){
                    alert('Запись обновлена');
                    init();
                    //location.reload();
                }
            }
        );
    } else {
        $.post(
            "../core/core.php",
            {
                "action" : "newGoods",
                "gid" : id,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdescription" : $('#gdescription').val(),
                "gorder" : $('.order-select').val(),
                "gimg" : $('#gimg').val(),
            },
            function (data){

                if (data == 1){
                    alert('Запись добавлена');
                    init();
                    //location.reload();
                }
            }
        );
    }
}




$(document).ready(function () {
    $.post(
        "../core/core.php",
        {
            "action": "checkAdmin"
        },
        function (data) {
            if (data !== '0') {
                init();
                getOrders();
                $('.add-to-db').on('click', saveToDb);
                $('body').append(`<button class="admin-exit">Выход</button>`);
                $('.admin-exit').on('click', adminExit);
            } else {
                let out = '';
                out += ` <div id = "popup" class="popup email-field">
                    <div class="popup-body">
                        <div class="popup-content">
                            <div class="popup-text">
                                <p class="login-field__text">Логин: <input type="text" id="login" class="login-field__input"></p>
                                <p class="login-field__text">Пароль: <input type="text" id="password" class="login-field__input"></p>
                                <p class="login-field__text"><button class="authorization" >Авторизироваться</button></p>
                            </div>
                        </div>
                    </div>
                </div>`;
                $('.admin').html(out);
                $('.authorization').on('click', login);

            }
        }
    );
})

function adminExit(){
    $.post(
        "../core/core.php",
        {
            "action": "exitAdmin"
        },
    )
    location.reload();
}

function login(){
    let login = $('#login').val();
    let password = $('#password').val();
    $.post(
        "../core/core.php",
        {
            "action" : "login",
            "login" : login,
            "password" : password

        },
        function (data){
            if (data !== '0'){
                location.reload();
            } else {
                console.log(data);
                alert("Неверный логин или пароль");
            }
        }
    );
}

function getOrders() {
    $.post(
        "../core/core.php",
        {
            "action" : "initOrders"

        },
        function (data) {
            data = JSON.parse(data);
            let out = '';
            for(let id in data){

                out += `<div class="admin-panel_ord">`;
                out += `<button class="delete_button" id=${data[id]['id']}>Удалить</button>`;
                out += `<div class="information_ord">`
                    out += `<p class="order_number">Заказ №: ${data[id]['id']}</p>`;
                    out += `<p>Имя: ${data[id]['name']}</p>`;
                    out += `<p>Email: ${data[id]['email']}</p>`;
                    out += `<p>Телефон: ${data[id]['ephone']}</p>`;
                out += `</div>`
                out += `<div class="information_product_" id="cart-${id}">`
                let cart = JSON.parse(data[id]['cart']);
                out += `<div class="total_cost" id="fullCost-${id}"></div>`

                let totalCost = 0;
                for(let id_ in cart){
                    selectOneGoods(id_, function (data_){
                        let out_ = '';
                        data_ = JSON.parse(data_);
                        out_ += `<div class="information_description">`;
                        out_ += `<p class="information_name">${data_['name']}</p>`;
                        out_ += `<img src="../../assets/images/product/${data_['img']}"}>`;
                        out_ += `<p>Количество: ${cart[id_]}</p>`
                        out_ += `<p id="cost-${id}">Цена за штуку: ${data_['cost']}</p>`
                        out_ += `</div>`;
                        let idCart = "cart-" + id;
                        let idCost = "fullCost-" + id;
                        totalCost += parseInt(data_['cost']) * parseInt(cart[id_]);
                        $(`#${idCost}`).html(totalCost);
                        $(`#${idCart}`).append(out_);
                    });
                }
                out += `</div>`;
                out += `</div>`;
                out += `</div>`;
            }

            $('.orders').html(out);
            $('.delete_button').on('click', deleteOrder);

        }
    );
}

function deleteOrder(){
    let id = $(this).attr('id');
    $.post(
        "../core/core.php",
        {
            "action" : "deleteOrder",
            "id" : id

        });
    getOrders();
}

