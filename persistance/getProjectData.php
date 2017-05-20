<?php
require("../user/userSystem.php");
checkIfLoggedIn("false");
require("dbconnect.php");
    
$userId = $_SESSION["userId"];  
$projectId = $_GET["project"];
    


    $sql="SELECT text FROM structit WHERE id='$projectId';";
    $result = mysqli_query($db,$sql);
    while($row = mysqli_fetch_array($result)) {
    
        echo $row["text"];
}
    
?>