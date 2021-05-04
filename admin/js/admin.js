
function init(){
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data){
    //console.log(data);
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
        data = JSON.parse(data);
        $('#gname').val(data.name);
        $('#gcost').val(data.cost);
        $('#gdescription').val(data.description);
        $('#gorder').val(data.ord);
        $('#gimg').val(data.img);
        $('.img_goods').html(`<img src="../assets/images/product/${data.img}" alt=""/>`);
        $('#gid').val(data.id);
    });
    /*$.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        function (data){
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gcost').val(data.cost);
            $('#gdescription').val(data.description);
            $('#gorder').val(data.ord);
            $('#gimg').val(data.img);
            $('.img_goods').html(`<img src="../assets/images/product/${data.img}" alt=""/>`);
            $('#gid').val(data.id);
        }
    );*/
}
function selectOneGoods(id, func){
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        func
        /*function (data){
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gcost').val(data.cost);
            $('#gdescription').val(data.description);
            $('#gorder').val(data.ord);
            $('#gimg').val(data.img);
            $('.img_goods').html(`<img src="../assets/images/product/${data.img}" alt=""/>`);
            $('#gid').val(data.id);
        }*/
    );
}

function saveToDb(){
    let id = $('#gid').val();
    if (id !== ''){
        $.post(
            "core.php",
            {
                "action" : "updateGoods",
                "gid" : id,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdescription" : $('#gdescription').val(),
                "gorder" : $('#gorder').val(),
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
            "core.php",
            {
                "action" : "newGoods",
                "gid" : id,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdescription" : $('#gdescription').val(),
                "gorder" : $('#gorder').val(),
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
    init();
    getOrders();
    $('.add-to-db').on('click', saveToDb);
});

function getOrders() {
    $.post(
        "../admin/core.php",
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
                        totalCost += parseInt(data_['cost']);
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
        "../admin/core.php",
        {
            "action" : "deleteOrder",
            "id" : id

        });
    getOrders();
}

