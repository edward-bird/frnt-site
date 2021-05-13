function addReview(){
    if($('#name').val() !== '' && $('#review').val() !== ''){
        $.post(
            "../core/core.php",
            {
                "action" : "addReview",
                "review" : $('#review').val(),
                "id_order" : $('#id_order').val(),
            },
            function (data){
                if (data == 1){
                    alert('Отзыв добавлен');
                    loadReviews();
                    //location.reload();
                } else {
                    alert('Заказ не найден');
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
                    out += `<div class="review review-id-${data[id].id_review}">`;
                    out += `<h2 class="review-name">Заказ №${data[id].id_order}</h2>`;
                    out += `<p class="review-text to-absolute">${data[id].review}</p>`;
                    if (data[id].id_answer) {
                        out += `<p class="answer-text to-absolute">${data[id].answer}</p>`;
                    }
                    out+= `</div>`;
                }
            }
            $('.review-output').html(out);

            $.post(
                "../core/core.php",
                {
                    "action" : "checkAdmin"
                },
                function (inf){
                    if(inf === 'admin'){
                        for (let id in data){
                            let out = '';
                            out += `<button class="review-delete" id="${data[id].id_review}">Удалить</button>`;
                            if (!data[id].id_answer) {
                                out += `<button class="review-answer" id="${data[id].id_review}">Добавить ответ</button>`;
                                out += `<div class="answer" id="answer-${data[id].id_review}"></div>`;
                            }
                            $(`.review-id-${data[id].id_review}`).append(out);

                        }
                    }
                    $('.review-delete').on('click', deleteReview);
                    $('.review-answer').on('click', addAnswer);
                }

            );


        }
    );
}

function addAnswer(){
    let id_review = $(this).attr('id');
    let out = '';
    out += `<p>Ответ: <textarea class="answer-text" id="answer_to_review-${id_review}"></textarea></p>`;
    out += `<button class="answer_to_DB" id="${id_review}">Сохранить ответ</button>`
    $(`#answer-${id_review}`).html(out);
    $('.answer_to_DB').on('click', answerToDB);
}


function answerToDB(){
    let id_review = $(this).attr('id');
    let answer = $(`#answer_to_review-${id_review}`).val();
    $.post(
        "../core/core.php",
            {
                "action" : "addAnswer",
                "id_review" : id_review,
                "answer" : answer
            },
            function (){
                loadReviews();
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