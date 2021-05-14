<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/search.css">
    <?php
    switch ($route) {
        case 'shop':
        case 'cart':
            echo '<link rel="stylesheet" href="../assets/css/shop.css">';
            break;
        case 'goods':
            echo '<link rel="stylesheet" href="../assets/css/goods.css">';
            break;
        case 'admin':
            echo '<link rel="stylesheet" href="../assets/css/style.css">
                <link rel="stylesheet" href="../assets/css/admin.css">';
            break;
        case 'contacts':
            echo '<link rel="stylesheet" href="../assets/css/information.css">
                  <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>';
            break;

        case '404':
        case 'about':
        case 'delivery':
        case 'founders':
        case 'reviews':
            echo '<link rel="stylesheet" href="../assets/css/information.css">';
            break;

    }

    ?>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700;900&display=swap" rel="stylesheet">
    <title>FRNTR</title>
</head>
<body>
<div class="header">

    <nav class="header__up">
        <ul class="up__menu__list container">
            <li><a href="delivery" class="up__menu__link">Оплата и доставка</a></li>
            <li><a href="founders" class="up__menu__link">Соискателям</a></li>
            <li><a href="reviews" class="up__menu__link">Отзывы</a></li>
            <li><a href="contacts" class="up__menu__link">Контакты</a></li>
            <li><a href="about" class="up__menu__link">О нас</a></li>
        </ul>
    </nav>


    <nav class="header__middle">
        <ul class="middle__menu__list container">
            <li class="logo"><a href="/"><img src="../assets/images/icon_main.png" alt="logo"></a></li>
            <li class="frnt__name">
                <ul>
                    <li class="main__name"><a href="/">FRNTR</a></li>
                    <li class="name__description">Мебельное производство</li>
                </ul>
            </li>
            <li>
                <ul class="mini__container">
                    <li class="phone__icon">
                        <img src="../assets/images/phone_icon.png" alt="phone__icon">
                    </li>
                    <li class="frnt__phone">
                        <ul>
                            <li class="phone__number">8 (999) 876 54 32</li>
                            <li class="phone__number">8 (999) 123 45 67</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <ul class="mini__container">
                    <li class="basket__icon">
                        <a href="cart">
                            <img src="../assets/images/basket__icon.png" alt="ordered">
                        </a>
                    </li>
                    <li class="header__counter basket-counter">0</li>
                </ul>

            </li>

        </ul>


    </nav>

    <nav class="header__down">
        <ul class="down__menu__list container">
            <li>
                <a href="kitchen" class="down__menu__link">Кухня</a>
                <ul class="down__sub-menu__list">
                    <li><a href="kitchen#1" class="sub-menu__link">Кухонные столы</a></li>
                    <li><a href="kitchen#2" class="sub-menu__link">Кухонные стулья</a></li>
                    <li><a href="kitchen#3" class="sub-menu__link">Кухни</a></li>
                </ul>


            </li>
            <li>
                <a href="livingroom" class="down__menu__link">Гостиная</a>
                <ul class="down__sub-menu__list">
                    <li><a href="livingroom#1" class="sub-menu__link">Стенки</a></li>
                    <li><a href="livingroom#2" class="sub-menu__link">Шкафы</a></li>
                    <li><a href="livingroom#3" class="sub-menu__link">Диваны</a></li>
                    <li><a href="livingroom#4" class="sub-menu__link">Кресла</a></li>
                    <li><a href="livingroom#5" class="sub-menu__link">Пуфы</a></li>
                </ul>

            </li>
            <li>
                <a href="children" class="down__menu__link">Детская</a>
                <ul class="down__sub-menu__list">
                    <li><a href="children#1" class="sub-menu__link">Детские кровати</a></li>
                    <li><a href="children#2" class="sub-menu__link">Детские столы</a></li>
                    <li><a href="children#3" class="sub-menu__link">Парты</a></li>
                    <li><a href="children#4" class="sub-menu__link">Двухъярусные кровати</a></li>
                </ul>
            </li>
            <li>
                <a href="bedroom" class="down__menu__link">Спальня</a>
                <ul class="down__sub-menu__list">
                    <li><a href="bedroom#1" class="sub-menu__link">Кровати</a></li>
                    <li><a href="bedroom#2" class="sub-menu__link">Шкафы</a></li>
                    <li><a href="bedroom#3" class="sub-menu__link">Гардеробные</a></li>
                    <li><a href="bedroom#4" class="sub-menu__link">Комоды</a></li>
                </ul>

            </li>
            <li>
                <a href="hallways" class="down__menu__link">Прихожие</a>
                <ul class="down__sub-menu__list">
                    <li><a href="hallways#1" class="sub-menu__link">Прихожие</a></li>
                    <li><a href="hallways#2" class="sub-menu__link">Обувницы</a></li>
                    <li><a href="hallways#3" class="sub-menu__link">Ключницы</a></li>
                    <li><a href="hallways#4" class="sub-menu__link">Подставки под зонты</a></li>
                </ul>

            </li>
            <li><a href="office" class="down__menu__link">Офисная мебель</a></li>
            <div class="search">
                <div>
                    <input class="search__place" type="text" placeholder="Искать здесь...">
                    <button class="search__submit"></button>
                </div>
            </div>
        </ul>
    </nav>
</div>
