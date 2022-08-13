<?php
    include "../config.php";
    $id=$_GET['id'];
    $link = mysqli_connect($host, $user, $password, $db);
    //$id_hall=htmlspecialchars($_GET['id_hall']);
    // Check connection
    if (!$link) {   
        die("Connection failed: " . mysqli_connect_error());
    }
    $query="SELECT P.id, P.product_name, G.group_name
    FROM products P, groups_name G
    WHERE P.id_group=G.id";
    $result = mysqli_query($link, $query);
    $n=mysqli_num_rows($result);
    for ($i=0; $i < $n ; $i++) { 
        $row =mysqli_fetch_assoc($result);
        echo $row["group_name"];
    }
    //$row =mysqli_fetch_assoc($result);
    

?>