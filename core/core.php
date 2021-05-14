<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {

    case 'init':
        init();
        break;
    case "selectOneGoods":
        selectOneGoods();
        break;
    case "updateGoods":
        updateGoods();
        break;
    case "newGoods":
        newGoods();
        break;
    case "deleteGoods":
        deleteGoods();
        break;
    case "loadGoods":
        loadGoods();
        break;
    case "setOrdToDB":
        setOrdToDB();
        break;
    case  "initOrders":
        initOrders();
        break;
    case "deleteOrder":
        deleteOrder();
        break;
    case "setDelivered":
        setDelivered();
        break;
    case "login":
        login();
        break;
    case "checkAdmin":
        checkAdmin();
        break;
    case "exitAdmin":
        exitAdmin();
        break;
    case "addReview":
        addReview();
        break;
    case "addAnswer":
        addAnswer();
        break;
    case "loadReviews":
        loadReviews();
        break;
    case "deleteReview":
        deleteReview();
        break;
    case "search":
        search();
        break;

    case "getCategories":
        getCategories();
        break;
    case "getGoodsInRange":
        getGoodsInRange();
        break;

}