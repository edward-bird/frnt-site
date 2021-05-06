<div class="footer__contrainer">
    <footer class="footer container">
        <div class="footer__information">
            <ul>
                <li class="footer__text-header"><a href="">Информация</a></li>
                <li class="footer__text"><a href="delivery">Оплата и доставка</a></li>
                <li class="footer__text"><a href="founders">Соискателям</a></li>
                <li class="footer__text"><a href="reviews">Отзывы</a></li>
                <li class="footer__text"><a href="contacts">Контакты</a></li>
                <li class="footer__text"><a href="about">О нас</a></li>
            </ul>

            <ul>
                <li class="footer__text-header"><a href="">Меню</a></li>
                <li class="footer__text"><a href="">Кухня</a></li>
                <li class="footer__text"><a href="">Гостиная</a></li>
                <li class="footer__text"><a href="">Детская</a></li>
                <li class="footer__text"><a href="">Спальня</a></li>
                <li class="footer__text"><a href="">Прихожие</a></li>
                <li class="footer__text"><a href="">Офисная мебель</a></li>
            </ul>

        </div>



    </footer>
</div>
<script src="js/jquery-3.6.0.min.js"></script>
<?php
    switch ($route){
        case 'cart':
            echo '<script src="/js/cart.js"></script>';
            break;
        case 'goods':
            echo '<script src="../js/main.js"></script>
                  <script src="../js/goods.js"></script>';
            break;
        case 'reviews':
            echo '<script src="../js/main.js"></script>
                  <script src="../js/review.js"></script>';
            break;
        default:
            echo '<script src="js/main.js"></script>';
            break;
    }

?>


</body>
</html>