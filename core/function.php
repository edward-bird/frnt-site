<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "frntr_list";

function connect(){
    $conn = mysqli_connect("localhost", "root", "root", "frntr_list");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}



function init(){
    //вывожу список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectOneGoods(){
    $conn = connect();
    $id = $_POST['gid'];
    $sql = "SELECT * FROM goods WHERE goods.id = '$id'";
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


    $sql = "UPDATE goods SET name = '$name', cost = '$cost', description = '$description', ord = '$ord', img = '$img' WHERE id= '$id' ";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error updating record: " . $conn->error;
    }

    mysqli_close($conn);
    //writeJSON();


}

function newGoods(){
    $conn = connect();
    $name = $_POST['gname'];
    $cost = $_POST['gcost'];
    $description = $_POST['gdescription'];
    $ord = $_POST['gorder'];
    $img = $_POST['gimg'];


    $sql = "INSERT INTO goods (name, cost, description, ord, img) VALUES ('$name', '$cost', '$description', '$ord', '$img')";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }

    mysqli_close($conn);
    //writeJSON();
}



function loadGoods(){
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
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


    $sql = "INSERT INTO order_list (email, ephone, cart, name) VALUES ('$email', '$ephone', '$cart', '$ename')";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }

    mysqli_close($conn);
}

function initOrders(){
    $conn = connect();
    $sql = "SELECT * FROM order_list";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
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
    $sql = "DELETE FROM `order_list` WHERE `order_list`.`id` = '$id'";

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $review = $_POST['review'];

    $sql = "INSERT INTO reviews (name, email, review) VALUES ('$name', '$email', '$review')";
    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $conn->error;
    }
    mysqli_close($conn);

}

function loadReviews(){
    $conn = connect();
    $sql = "SELECT * FROM reviews";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function deleteReview(){
    $conn = connect();
    $id = $_POST['id'];
    $sql = "DELETE FROM `reviews` WHERE `reviews`.`id` = '$id'";

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

function getCategories(){
    $conn = connect();
    $sql = "SELECT * FROM `category`";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id_category"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }

    mysqli_close($conn);
}