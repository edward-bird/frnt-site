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
    case "checkAdmin":
        checkAdmin();
        break;
}