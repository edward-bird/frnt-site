function search(){
    let name = $('.search__place').val();
    $.post(
        "../core/core.php",
        {
            "action" : "search",
            "name" : name
        },
        function (data){
            if (data !== '0'){
                //data = JSON.parse(data);
                localStorage.setItem('search', data);
                document.location.href = 'search';
            } else {
                alert("Ничего не найдено");
            }
        }
    )
}

function searchOut(){
    let data = localStorage.getItem('search');
    data = JSON.parse(data);
    let out = '';
    for (let key in data){
        out += `<div class="search-result" data-category="${data[key]['id_category']}">`;
        out += `<img class="search-img" src="../assets/images/product/${data[key]['img']}">`;
        out += `<a href="goods#${data[key]['id_product']}">${data[key]['name']}</a>`
        out += `<p class="search-cost">${data[key]['cost']}</p>`;
        out += `</div>`;
    }
    $('.search-content').html(out);
}

function getCategory(){

    $.post(
        "../core/core.php",
        {
            "action" : "getCategories"
        },

        function (data){
            let out = '<option value="0">Выберите категорию...</option>';
            data = JSON.parse(data);
            for (let id in data){
                out += `<option value="${data[id].id_category}">${data[id].name_parent.toUpperCase() + ' --- ' + data[id].name_category}</option>`;
            }
            $('.category-change').html(out);
        }
    )
}

function changeCategory(){
    let id_category = $('.category-change').find(":selected").val();
    console.log(id_category);
    $.each($('.search-result'), function () {
        if ($(this).attr('data-category') !== id_category && id_category !== '0'){
            $(this).hide();
        } else {
            $(this).show();
        }
    });

}

$(document).ready(function (){
    $('.search__submit').on('click', search);
    if (window.location.pathname === '/search'){
        getCategory();
        searchOut();
        $('.category-change').on('change', changeCategory);
    }
})