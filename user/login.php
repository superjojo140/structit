<?php
/*

Diese Seite wird aufgerufen, wenn eine beliebige andere Seite die Funktion 
    checkIfLoggedIn(triggerUrl,adminNecessary); 
aufruft. Wenn der Nutzer nicht eingeloggt ist, wird er auf diese Seite weitergeleitet.

Dieses Script bekommt als GET-Parameter eine triggerUrl und einen Boolean (adminNecessary), ob der Nutzer Admin Rechte benötigt um  zur geschützten Seite weitergeleitet zu werden.

Formular zum Login / Register wird angezeigt, triggerUrl und adminNecessary werden alss hidden Formularfeld eingebettet.
Formulardaten werden wieder an login.php gesendet und bei Erfolg wird an triggerUrl weitergeleitet.

*/

include('../persistance/dbconnect.php');


 /*if($_POST['task']=="register"){
        $name=$_POST['name'];
        $username=$_POST['username'];
        $mail=$_POST['mail'];
        $password=$_POST['password'];
        $password_md5=md5($password);
        
        $befehl ="INSERT INTO user (nickname,passwort,name,mail,aktiv) VALUES ('$username', '$password_md5', '$name', '$mail', true)";
	   $ergebnis = mysqli_query($db, $befehl) or die("Fehler beim registrieren1"); 
        
        $icon="done";
        $message="Erfolgreich registriert!";
    }*/
   
    

?>
    <!DOCTYPE html>
    <html>

    <head>
        <title>Superjojo.de - Login</title>
        <link rel="stylesheet" type="text/css" href="login.css">
        <link href="https://fonts.googleapis.com/css?family=Exo" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="../node_modules/jquery/dist/jquery.js"></script>
        <meta charset="utf-8"> 
    </head>

    <body>
        <? include('../header.php'); ?>
            <mainBox>
                <label>Superjojo.de</label>
                <tabBar>
                    <tab id=loginTab class="activeTab" onClick="showLogin()">Login</tab>
                    <tab id=registerTab onClick="showRegister()">Sign up</tab>
                </tabBar>
                <messageBox id="messageBox" style="display:none;">
                    <icon class="icon" id="messageIcon">cancel</icon>
                    <message id="messageText">Null</message>
                </messageBox>
                <form id="loginForm" action="javascript:login()" method="POST">
                    <input type="text" id="mainLoginUsername" name="username" placeholder="Nutzername" autofocus>
                    <br>
                    <input type="password" id="mainLoginPassword" name="password" placeholder="Passwort">
                    <br>
                    <input type="submit" value="Login">
                    <br> </form>
                <form id="registerForm" action="login.php" method="POST" style="display: none;">
                    <input type="hidden" name="task" value="register">
                    <input type="text" name="username" placeholder="Nutzername" required>
                    <br>
                    <input type="text" placeholder="Name" name="name" required>
                    <br>
                    <input type="email" name="mail" placeholder="E-Mail" required>
                    <br>
                    <input type="password" name="password" placeholder="Passwort" required>
                    <br>
                    <input type="submit" value="Sign up"> </form>
            </mainBox>
    </body>
    <script src="login.js"></script>

    </html>