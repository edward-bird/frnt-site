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
                data = JSON.parse(data);
                document.location.href = `goods#${data.id}`;
            } else {
                alert("Ничего не найдено");
            }
        }
    )
}

$(document).ready(function (){
    $('.search__submit').on('click', search);
})