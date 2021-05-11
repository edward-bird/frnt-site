<div class="footer__contrainer">
    <footer class="footer container">
        <div class="footer__information">
            <ul>
                <li class="footer__text-header">Информация</li>
                <li class="footer__text"><a href="delivery">Оплата и доставка</a></li>
                <li class="footer__text"><a href="founders">Соискателям</a></li>
                <li class="footer__text"><a href="reviews">Отзывы</a></li>
                <li class="footer__text"><a href="contacts">Контакты</a></li>
                <li class="footer__text"><a href="about">О нас</a></li>
            </ul>

            <ul>
                <li class="footer__text-header">Меню</li>
                <li class="footer__text"><a href="kitchen">Кухня</a></li>
                <li class="footer__text"><a href="livingroom">Гостиная</a></li>
                <li class="footer__text"><a href="children">Детская</a></li>
                <li class="footer__text"><a href="bedroom">Спальня</a></li>
                <li class="footer__text"><a href="hallways">Прихожие</a></li>
                <li class="footer__text"><a href="office">Офисная мебель</a></li>
            </ul>

        </div>

        <a href="admin" class="admin-panel-link">admin panel</a>

    </footer>
</div>
<script src="../js/jquery-3.6.0.min.js"></script>
<script src="../js/search.js"></script>
<?php


switch ($route) {
    case 'cart':
        echo '<script src="../js/cart.js"></script>';
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
        echo '<script src="../js/main.js"></script>';
        break;
}


?>


</body>
</html>