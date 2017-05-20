<?php
require('../persistance/dbconnect.php');

$data = $_POST['getData'];

$username = $data[0];
$passwort = $data[1];
$adminNecessary = $data[2];

//SQL Injects vermeiden
$username = mysqli_real_escape_string($db, $username);
$passwort = mysqli_real_escape_string($db, $passwort);
    
    
//Passwort verschlüsseln
$passwort_md5=md5($passwort);

// Benutzername und Passwort werden überprüft
$befehl = "SELECT * FROM user WHERE nickname='$username' AND passwort= '$passwort_md5' AND aktiv=1;";
$ergebnis = mysqli_query($db,$befehl);


if (($ergebnis->num_rows) > 0){
    
    //Daten aus dem Datenbank Ergebnis lesen
    while($row = mysqli_fetch_object($ergebnis)){
        $admin=$row->admin;
        $user_id_db=$row->id;
        $userName=$row->name;
    }
    
    if($adminNecessary == "false" || $admin == 1){
         //Session Werte setzen
        session_start();
        $_SESSION['userId']=$user_id_db;
        $_SESSION['admin']=$admin; 
        $_SESSION['userName']=$userName;

        $toReturn = array("state" => "ok", "text" => "$userName");
    }
    else{
        $toReturn = array("state" => "error", "text" => "Sie haben keine Rechte um auf diesen Dienst zuzugreifen" , "icon" => "lock");
    }
    
   
    
   }

else{ //Keine gültige Username-Passwort-Admin Kombination
    
    $toReturn = array("state" => "error", "text" => "Falscher Nutzername oder Passwort", "icon" => "cancel");
    
    }

echo json_encode($toReturn);

?>