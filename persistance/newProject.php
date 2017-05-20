<?php
require("../user/userSystem.php");
checkIfLoggedIn("false");
require("dbconnect.php");
    
$userId = $_SESSION["userId"]; 

$text = '<item data-level="1" id="item-1" data-parent="item-0" data-childcount="0" data-prev="undefined" data-next="undefined">
                        <itemcontent class="blue" data-item="item-1">
                            <textarea rows="1" type="text" placeholder="Type some Topic" data-item="item-1" style="height: 22px; overflow-y: hidden;"></textarea>
                            <delete class="icon" data-item="item-1">settings</delete>
                        </itemcontent>
                        <itemcontainer data-item="item-1"> </itemcontainer>
                    </item>';
    


 //Add Project in liveTimeProjects Table
    $name=$_GET['name'];
    $sql="INSERT INTO structit (name,user,text) VALUES ('$name','$userId','$text');";
    mysqli_query($db,$sql);
    
?>