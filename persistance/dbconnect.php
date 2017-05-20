<?php
$db = mysqli_connect("localhost", "structit", "structit", "structit");
if(!$db)
{
  exit("Verbindungsfehler mit der Datenbank: ".mysqli_connect_error());
}
?>