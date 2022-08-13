<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body id="first_body">
    <div class="div_menu">
        <div id="portal_icon" type='check'>
            <svg width="30" height="30" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 8C25.92 8 8 25.92 8 48C8 70.08 25.92 88 48 88C70.08 88 88 70.08 88 48C88 25.92 70.08 8 48 8ZM48 20C54.64 20 60 25.36 60 32C60 38.64 54.64 44 48 44C41.36 44 36 38.64 36 32C36 25.36 41.36 20 48 20ZM48 76.8C38 76.8 29.16 71.68 24 63.92C24.12 55.96 40 51.6 48 51.6C55.96 51.6 71.88 55.96 72 63.92C66.84 71.68 58 76.8 48 76.8Z" fill="white"/>
            </svg>
            <p>My account<p>
        </div>
        <div class="menu_options">
            <div type='check'>Sign in</div>
            <div type='reg'>Sign Up</div>
        </div>
        
    </div>
    
    <main>
        <div class="main_content">
            <?php
                $fist_section=file_get_contents("search_main.html");
                echo $fist_section;
            ?>
        </div>
        <h3>Tables configuration</h3>
        <h4 id="hall_name">Hall name - 
            <?php
            if (isset($_SESSION["hall_name"])){
                echo $_SESSION["hall_name"];
            }
            else{
                echo "no choosen";
            }
            ?>
    
        </h4>
        <div id="hall"></div>
        <button id="reset_config">Reset configuration</button>
        <button id="save_config_btn">Save configuration</button>
        
        <div id="order_div">
            <button id="close_order">
                <div class="icon_close"></div>
            </button>
            <p>Choose the products </p>
            <div class="main_order_div">
                <div id="products_div">
                    
                </div>

            </div>
        </div>
    </main>
    
</body>
</html>
<script src="script.js"></script>