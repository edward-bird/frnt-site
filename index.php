<?php
$route = $_GET['route'];

$route_parts = explode('/', $route);

if ($route != 'admin') {
    require 'templates/header.php';
}

switch ($route) {
    case '':
        require 'templates/main.php';
        break;
    case 'cart':
        require 'templates/cart.php';
        break;
    case 'goods':
        require 'templates/goods.php';
        break;
    case 'shop':
        require 'templates/shop.php';
        break;
    case 'admin':
        require 'templates/admin.php';
        break;
    case 'about':
        require 'templates/information/about.php';
        break;
    case 'contacts':
        require 'templates/information/contacts.php';
        break;
    case 'delivery':
        require 'templates/information/delivery.php';
        break;
    case 'founders':
        require 'templates/information/founders.php';
        break;
    case 'reviews':
        require 'templates/information/reviews.php';
        break;

    case 'bedroom':
        require 'templates/content/bedroom.php';
        break;
    case 'children':
        require 'templates/content/children.php';
        break;
    case 'hallways':
        require 'templates/content/hallways.php';
        break;

    case 'livingroom':
        require 'templates/content/living_room.php';
        break;
    case 'office':
        require 'templates/content/office.php';
        break;



    default:
        require 'templates/information/404.php';
        break;
}

if ($route != 'admin') {
    require 'templates/footer.php';
}

