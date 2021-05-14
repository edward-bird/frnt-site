function init(){
    let out = '<div class="container">\n' +
        '\n' +
        '    <div class="admin-panel">\n' +
        '        <div class="goods-out"></div>\n' +
        '        <h2 class="admin-panel__h">Товар</h2>\n' +
        '        <button class="good-delete">Удалить</button>' +
        '        <p>Имя <input type="text" id="gname"></p>\n' +
        '        <p>Стоимость <input type="text" id="gcost"></p>\n' +
        '        <p>Описание <textarea id="gdescription"></textarea></p>\n' +
        '        <p>Изображение <input type="text" id="gimg"></p>\n' +
        '        <div class="img_goods"></div>\n' +
        '        <input type="file" class="img-file" id="myfile" name="myfile2"/>' +
        '        <p>Выбрать/изменить категорию </p>' +
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
    $('.good-delete').on('click', goodsDelete);
    getOrderSelector();
    $.post(
        "../core/core.php",
        {
            "action" : "getCategories"
        },
        showGoods
    );
}

function goodsDelete(){
    if ($('#gid').val() !== ''){
        $.post(
            "../core/core.php",
            {
                "action" : "deleteGoods",
                "id_product" : $('#gid').val()
            },
            function (data){
                if (data == 1){
                    alert("Запись удалена");
                    location.reload();
                }
            }
        );
    }
}

function showGoods(data){
    data = JSON.parse(data);
    console.log(data);
    let out = '<select class="category_select">';
    out += '<option data-id="0">Новый товар</option>';
    for (let id in data){
        out += `<option class="admin-panel__option" data-id="${id}">
        ${data[id].name_parent.toUpperCase() + ' --- ' + data[id].name_category}</option>`;
    }
    out += `</select>`;
    out += '<select class="product_select"></select>';
    $('.goods-out').html(out);
    $('.category_select').on('change', selectCategory);
}

function selectCategory(){
    let id_category = $('.category_select option:selected').attr('data-id');

    console.log(id_category);
    $.post(
        "../core/core.php",
        {
            "action" : "init",
            "category_id": id_category
        },
        function (data){
            let out = '';
            if (data === '0') {
                out += `<option class="admin-panel__option" data-id="0">В данной категории нет товара</option>`;
            } else {
                out += `<option class="admin-panel__option" data-id="0">Выберите товар...</option>`;
                data = JSON.parse(data);
                console.log(data);

                for (let id in data){
                    console.log(data[id]);
                    out += `<option class="admin-panel__option" data-id="${data[id].id_product}">${data[id].name}</option>`;
                }
            }
            $('.product_select').html(out);
            $('.product_select').on('change', selectProduct);
        }
    )



}

function selectProduct(){
    let id_product = $('.product_select option:selected').attr('data-id');
    if(id_product !== '0') {
        selectOneGoods(id_product, function (data) {
            console.log(id_product);
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gcost').val(data.cost);
            $('#gdescription').val(data.description);
            $(`.order-select option[value=${data.ord}]`).prop("selected", true);
            $('#gimg').val(data.img);
            $('.img_goods').html(`<img src="../assets/images/product/${data.img}" alt=""/>`);
            $('#gid').val(data.id_product);
        });
    }
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
                $('.order-select').append(`<option value="${data[id].id_category}">${data[id].name_parent.toUpperCase() + ' --- ' + data[id].name_category}</option>`)
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
    console.log(id);
    if (id !== '' ){
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
                    location.reload();
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
                    location.reload();
                } else {
                    console.log(data);
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
                $('.img-file').on('change', loadFile);
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

function loadFile(){
    let files = this.files;
    event.stopPropagation();
    event.preventDefault();
    if( typeof files == 'undefined' ) return;
    let data = new FormData();
    $.each( files, function( key, value ){
        data.append( key, value );
    });

    data.set('action', 'loadImg');
    data.append( 'my_file_upload', '1' );

    $.ajax({
        url         : '../core/loadFiles.php',
        type        : 'POST',
        data        : data,
        cache       : false,
        dataType    : 'json',
        processData : false,
        contentType : false,
        success     : function( respond, status, jqXHR ){
            if( typeof respond.error === 'undefined' ){
                let filesPath = respond.files + '';
                let imageName = (filesPath).split('\\').pop().split('/').pop();
                $('#gimg').val(imageName);
                $('.img_goods').html(`<img src="../assets/images/product/${imageName}">`);
            } else {
                console.log('ОШИБКА: ' + respond.data );
            }
        },
        error: function( jqXHR, status, errorThrown ){
            console.log( 'ОШИБКА AJAX запроса: ' + status, jqXHR );
        }

    });
}

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
            console.log(data);
            let out = '';
            for(let id in data){
                out += `<div class="admin-panel_ord">`;
                out += `<button class="delete_button" id=${id}>Удалить</button>`;
                out += `<div class="information_ord">`
                    out += `<p class="order_number">Заказ №: ${id}</p>`;
                    out += `<p>Имя: ${data[id]['client']['name_client']}</p>`;
                    out += `<p>Email: ${data[id]['client']['email_client']}</p>`;
                    out += `<p>Телефон: ${data[id]['client']['phone_client']}</p>`;
                    if (data[id].hasOwnProperty('delivered')){
                        if (data[id]['delivered'] != 1){
                            data[id]['delivered'] = 'не доставлено';
                        } else {
                            data[id]['delivered'] = 'доставлено';
                        }
                        out += `<p class="order_number">Доставка</p>`;
                        out += `<p>Улица: ${data[id]['adress']['street']}</p>`;
                        out += `<p>Дом: ${data[id]['adress']['house']}</p>`;
                        out += `<p>Квартира: ${data[id]['adress']['flat']}</p>`;
                        out += `<p>Доставка: ${data[id]['delivered']}</p>`;
                        if (data[id]['delivered'] === 'не доставлено') {
                            out += `<button id=${id} class="set-delivered">Доставлено</button>`;
                        }
                    }
                out += `</div>`
                out += `<div class="information_product_" id="cart-${id}">`
                out += `<div class="total_cost" id="fullCost-${id}"></div>`

                let totalCost = 0;
                for (let id_product in data[id]['products']){
                    selectOneGoods(id_product, function (data_){
                        let out_ = '';
                        data_ = JSON.parse(data_);
                        out_ += `<div class="information_description">`;
                        out_ += `<p class="information_name">${data_['name']}</p>`;
                        out_ += `<img src="../../assets/images/product/${data_['img']}"}>`;
                        out_ += `<p>Количество: ${data[id]['products'][id_product]['number']}</p>`
                        out_ += `<p id="cost-${id}">Цена за штуку: ${data_['cost']}</p>`
                        out_ += `</div>`;
                        let idCart = "cart-" + id;
                        let idCost = "fullCost-" + id;
                        totalCost += parseInt(data_['cost']) * parseInt(data[id]['products'][id_product]['number']);
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
            $('.set-delivered').on('click', function (){
                let idButton = $(this).attr('id');
                $.post(
                    "../core/core.php",
                    {
                        "action" : "setDelivered",
                        "id" : idButton
                    },
                    function (data){
                        console.log(data);
                    }
                );
                getOrders();
            });

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
        }
        );
    getOrders();
}

