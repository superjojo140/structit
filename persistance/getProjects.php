<?php
require("../user/userSystem.php");
checkIfLoggedIn("false");
require("dbconnect.php");
    
$userId = $_SESSION["userId"];   
    


    $sql="SELECT name,id FROM structit WHERE user='$userId';";
    $result = mysqli_query($db,$sql);
    while($row = mysqli_fetch_array($result)) {
        
        $projectId = $row['id'];
        $htmlId = "project".$row['id'];
    
        echo "<project ";
        if ($row['id'] == $_GET['project']) {
        echo 'class="projectActive "';
        }
        echo "id=$htmlId>";
        echo "<icon style='color:red;' onclick='deleteProject($projectId)'>clear</icon>";
        echo $row['name']."</project>";
}
    
?>