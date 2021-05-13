<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "frntr_list";

function connect(){
    $conn = mysqli_connect("localhost", "root", "root", "furniture");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}



function init(){
    //вывожу список товаров
    $conn = connect();
    $category_id = $_POST["category_id"];
    $sql = "SELECT id_product, name FROM product WHERE id_category = '$category_id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id_product"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo '0';
    }
    mysqli_close($conn);
}

function selectOneGoods(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM product WHERE product.id_product = '$id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo $conn->error;
    }
    mysqli_close($conn);
}

function updateGoods(){
    $conn = connect();

    $id = $_POST['gid'];
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $description = $_POST['gdescription'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];


    $sql = "UPDATE product SET name = '$name', cost = '$cost', description = '$description', id_category = '$ord', img = '$img' WHERE id_product = '$id' ";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error updating record: " . $conn->error;
    }

    mysqli_close($conn);


}

function newGoods(){
    $conn = connect();
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $description = $_POST['gdescription'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];


    $sql = "INSERT INTO product (name, cost, description, id_category, img) VALUES ('$name', '$cost', '$description', '$ord', '$img')";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }

    mysqli_close($conn);
}



function getCategories(){
    $conn = connect();
    $sql = "SELECT * FROM `category` INNER JOIN `parent_category` ON category.id_parent = parent_category.id_parent";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id_category"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "Error: " . $conn->error;
    }

    mysqli_close($conn);
}


function loadGoods(){
    $conn = connect();
    $products = $_POST['products'];
    $sql = "SELECT * FROM product WHERE id_product IN (".implode(',', $products).")" ;
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id_product"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}



function setOrdToDB(){
    $conn = connect();
    $ename = $_POST['ename'];
    $email = $_POST['email'];
    $ephone = $_POST['ephone'];
    $cart = $_POST['cart'];

    $delivered = $_POST['delivered'];
    if ($delivered === 'true') {
        $delivered = '1';
    } else {
        $delivered = '0';
    }

    $sql = "INSERT INTO client (name_client, email_client, phone_client) VALUES ('$ename', '$email', '$ephone'); ";
    loadToDb($conn,$sql);
    $id_client = mysqli_insert_id($conn);

    if($delivered === '1') {
        $street = $_POST['street'];
        $house = $_POST['house'];
        $flat = $_POST['flat'];
        $sql = "INSERT INTO adress (street, house, flat) VALUES ('$street', '$house', '$flat'); ";
        loadToDb($conn,$sql);
        $id_adress = mysqli_insert_id($conn);
        $sql = "UPDATE client SET id_adress = '$id_adress' WHERE id_client = '$id_client'; ";
        loadToDb($conn,$sql);
        $sql = "INSERT INTO delivery (id_adress, id_client) VALUES  ('$id_adress', '$id_client'); ";
        loadToDb($conn,$sql);
        $id_delivery = mysqli_insert_id($conn);
        $sql = "UPDATE adress SET id_delivery = '$id_delivery' WHERE  id_adress = '$id_adress'";
        loadToDb($conn,$sql);

    }

    $sql = "INSERT INTO client_order (id_client, delivery) VALUES  ('$id_client', '$delivered'); ";
    loadToDb($conn,$sql);
    $id_order = mysqli_insert_id($conn);
    foreach ($cart as $position){
        $sql = "INSERT INTO order_product (id_order, id_product, number) VALUES ('$id_order', '$position[0]', '$position[1]'); ";
        loadToDb($conn,$sql);
    }
    echo $id_order;
    mysqli_close($conn);
}

function loadToDb($conn, $sql){
    $conn->query($sql);
    /*if ($conn->query($sql) === TRUE){
        echo "1";
    } else {
        echo "Error: " . $conn->error;
    }*/
}

function initOrders(){
    $conn = connect();
    $sql = "SELECT * FROM client_order";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $id_client = $row['id_client'];
            $id_order = $row['id_order'];
            $delivery = $row['delivery'];

            $sql = "SELECT * FROM client WHERE `id_client` = '$id_client'";
            $client = mysqli_query($conn, $sql);

            $out[$id_order]['client'] = mysqli_fetch_assoc($client);
            $id_adress = $out[$id_order]['client']['id_adress'];

            $sql = "SELECT id_product, number FROM order_product WHERE `id_order` = '$id_order'";
            $products = mysqli_query($conn, $sql);
            while ($row_product = mysqli_fetch_assoc($products)){
                $out[$id_order]['products'][$row_product['id_product']] = $row_product;
            }
            if ($delivery === '1'){
                $sql = "SELECT street, house, flat, id_delivery FROM adress WHERE id_adress = '$id_adress'";
                $adress = mysqli_query($conn, $sql);
                $out[$id_order]['adress'] = mysqli_fetch_assoc($adress);
                $id_delivery = $out[$id_order]['adress']['id_delivery'];

                $sql = "SELECT delivered FROM delivery WHERE id_delivery = '$id_delivery'";
                $delivery_table = mysqli_query($conn, $sql);
                $delivery_raw = mysqli_fetch_assoc($delivery_table);
                $out[$id_order]['delivered'] = $delivery_raw['delivered'];
            }
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function deleteOrder(){
    $conn = connect();
    $id = $_POST['id'];
    $sql = "DELETE FROM `client_order` WHERE `id_order` = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);
}

function setDelivered(){
    $conn = connect();
    $id = $_POST['id'];
    $sql = "SELECT id_client FROM client_order WHERE id_order = '$id'";
    $client = mysqli_query($conn, $sql);
    $id_client = (mysqli_fetch_assoc($client)['id_client']);

    $sql = "SELECT id_adress FROM client WHERE id_client = '$id_client'";
    $adress = mysqli_query($conn, $sql);
    $id_adress = (mysqli_fetch_assoc($adress)['id_adress']);

    $sql = "SELECT id_delivery FROM adress WHERE id_adress = '$id_adress'";
    $delivery = mysqli_query($conn, $sql);
    $id_delivery = (mysqli_fetch_assoc($delivery)['id_delivery']);

    $sql = "UPDATE delivery SET delivered = 1 WHERE id_delivery = '$id_delivery'";
    loadToDb($conn, $sql);
    //$delivery_table = mysqli_query($conn, $sql);

    mysqli_close($conn);
}

function checkAdmin(){
    if ($_SESSION['admin']){
        echo $_SESSION['admin'];
    } else {
        echo 0;
    }
}
function exitAdmin(){
    $_SESSION['admin'] = '';
}

function login(){
    $conn = connect();
    $login = $_POST['login'];
    $password = md5($_POST['password']);
    $sql = "SELECT * FROM `admin` WHERE `login` = '$login' AND `password` = '$password'";
    $result = mysqli_query($conn, $sql);
    if(mysqli_num_rows($result) > 0){
        $_SESSION['admin'] = 'admin';
        echo $_SESSION['admin'];
    } else {
        echo 0;
    }
    mysqli_close($conn);
}

function addReview(){
    $conn = connect();
    $review = $_POST['review'];
    $id_order = $_POST['id_order'];

    $sql = "INSERT INTO reviews (id_order, review) VALUES ('$id_order', '$review')";
    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);

}

function addAnswer(){
    $conn = connect();
    $answer = $_POST['answer'];
    $id_review = $_POST['id_review'];

    $sql = "INSERT INTO answer_reviews (id_review, answer) VALUES ('$id_review', '$answer')";
    $conn->query($sql);
    $id_answer = mysqli_insert_id($conn);
    $sql = "UPDATE reviews SET id_answer = '$id_answer'WHERE id_review = '$id_review'";
    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);
}
function loadReviews(){
    $conn = connect();
    $sql = "SELECT * FROM answer_reviews RIGHT OUTER JOIN reviews ON reviews.id_answer = answer_reviews.id_answer";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row['id_review']] = $row;
        }
        echo json_encode($out);
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);
}

function deleteReview(){
    $conn = connect();
    $id = $_POST['id'];
    $sql = "DELETE FROM reviews WHERE id_review = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);

}



function search(){
    $conn = connect();
    $name = $_POST['name'];
    $sql = "SELECT * FROM `goods` WHERE `name` = '$name'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        echo json_encode(mysqli_fetch_assoc($result));
    } else {
        echo "0";
    }
    mysqli_close($conn);
}


function getGoodsInRange(){
    $conn = connect();
    $rangeStart = $_POST['rangeStart'];
    $rangeEnd = $_POST['rangeEnd'];
    $sql = "SELECT * FROM product WHERE `id_category` BETWEEN '$rangeStart' AND '$rangeEnd'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id_product"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}