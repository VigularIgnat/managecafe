<?php
    $_SERVER["CONTENT_TYPE"] ==  'application/json';
    
    header('Content-type', 'application/json;');
    $params = json_decode(file_get_contents("php://input"), true);
    //include "../config.php";
    if (isset($params)){
        include "../config.php";   
        $link = mysqli_connect($host, $user, $password, $db);
        $n=count($params);
        var_dump($params);
        for ($i=0; $i < $n ; $i++) { 
            $table_name=htmlspecialchars($params[$i]["table_name"]);
            $pos_x=htmlspecialchars($params[$i]["pos_x"]);
            $pos_y=htmlspecialchars($params[$i]["pos_y"]);
            
            $orient=htmlspecialchars($params[$i]["orient"]);
            $id=htmlspecialchars($params[$i]["id"]);
            $query="UPDATE tables SET table_name='".$table_name."', pos_x='".$pos_x."', pos_y='".$pos_y."', orient=".$orient." WHERE id=".$id."";
            $result = mysqli_query($link, $query);

            echo "".$result."";
        }
        
    
    
    
    }
    
    
   

?>