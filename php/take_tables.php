<?php
    //echo 1;
    session_start();
    //echo 'PHP version: ' . phpversion();
    if (isset($_GET["id_hall"])){
        
        include "../config.php";
        $link = mysqli_connect($host, $user, $password, $db);
        $id_hall=htmlspecialchars($_GET['id_hall']);
        // Check connection
        if (!$link) {   
        die("Connection failed: " . mysqli_connect_error());
        }
        //$num_card=mysqli_real_escape_string($link,$num_card);
        //$pin_card=mysqli_real_escape_string($link,$pin_card);
        $query="SELECT hall_name
        FROM halls
        WHERE id=".$id_hall;
        $result = mysqli_query($link, $query);
        $row =mysqli_fetch_assoc($result);
        $_SESSION["hall_name"]= $row["hall_name"];

        $query="SELECT *
        FROM tables 
        WHERE id_hall=".$id_hall;
        $result = mysqli_query($link, $query);

        $n=mysqli_num_rows($result);
        $json_tables='[';
        for ($i=0; $i<$n; $i++){
            $row =mysqli_fetch_assoc($result);
            $json_tables.="{";
            foreach ($row as $key => $value){
                //echo $key.":".$value;
                $json_tables.= '"'.$key.'":"'.$value.'",';
            }
            $json_tables=substr($json_tables, 0, -1);
            $json_tables.="},";
        }
        $json_tables=substr($json_tables, 0, -1);
        $json_tables.="]";
        echo $json_tables;
    }
?>