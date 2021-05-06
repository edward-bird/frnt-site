let hash = "a974b1b54d0177d843b036103ae61de5b4287c79d7015c851fc3c810f917e830041ef8145da16e9c9cbc150e0636ad4cf22cf04aa2377f862a79d483a517044d"
function addReview(){
    if($('#name').val() != '' && $('#review').val() != ''){
        $.post(
            "../core/core.php",
            {
                "action" : "addReview",
                "name" : $('#name').val(),
                "email" : $('#email').val(),
                "review" : $('#review').val(),
            },
            function (data){
                if (data == 1){
                    alert('Отзыв добавлен');
                    loadReviews();
                    //location.reload();
                }
            }
        );
    }

}

function loadReviews(){
    $.post(
        "../core/core.php",
        {
            "action" : "loadReviews",

        },
        function (data){
            let out = '';
            if (data === ''){
                out += `<div class="review">`;
                out += `<p>Отзывов пока нет</p>`;
                out+= `</div>`;
            } else {
                data = JSON.parse(data);
                for (let id in data){
                    out += `<div class="review">`;
                    out += `<h2 class="review-name">${data[id].name}</h2>`;
                    out += `<p class="review-text to-absolute">${data[id].review}</p>`;
                    if (sessionStorage.getItem('hash') === hash){
                        out += `<p class="review-email">email: ${data[id].email}</p>`;
                        out += `<button class="review-delete" id="${data[id].id}">Удалить</button>`;
                    }
                    out+= `</div>`;
                }
            }
            $('.review-output').html(out);
            $('.review-delete').on('click', deleteReview);
        }
    );
}

$(document).ready(function (){
    loadReviews();
    $('.add-review').on('click', addReview);

})

function deleteReview(){
    let id = $(this).attr('id');
    console.log(id);
    $.post(
        "../core/core.php",
        {
            "action" : "deleteReview",
            "id" : id

        },
        function (data){
            if(data === '1') alert("Запись удалена");
        }
        );
    loadReviews();
}