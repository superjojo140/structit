<?php

function checkIfLoggedIn($adminNecessary){
    session_start();
    $triggerUrl = getCurrentUrl();
    
    if ($adminNecessary != "false"){
        if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !=1 || !isset($_SESSION['userId']) || !$_SESSION['userId']){
            header("Location: user/login.php?triggerUrl=$triggerUrl&adminNecessary=$adminNecessary");
            exit;
        }
    }
    else{
        if (!isset($_SESSION['userId']) || !$_SESSION['userId'] ) { 
            header("Location: user/login.php?triggerUrl=$triggerUrl&adminNecessary=$adminNecessary");
            exit;
    }
    }

    
}

function getCurrentUrl() {
        return ((empty($_SERVER['HTTPS'])) ? 'http' : 'https') . "://". $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}
?> 