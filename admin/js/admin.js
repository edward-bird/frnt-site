
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
    data = JSON.parse(data);
    console.log(data);
    let out = '<select>';
    out += '<option data-id="0">Новый товар</option>';
    for (let id in data){
        out += `<option data-id="${id}">${data[id].name}</option>`;
    }
    out += `</select>`;
    $('.goods-out').html(out);
    $('.goods-out select').on('change', selectGoods);
}

function selectGoods(){
    let id = $('.goods-out select option:selected').attr('data-id');
    console.log(id);
    $.post(
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
    $('.add-to-db').on('click', saveToDb);
});