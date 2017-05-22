<?php
require("user/userSystem.php");
checkIfLoggedIn("false");
?>
    <!DOCTYPE html>
    <html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="visualisation/structit.css">
        <link rel="stylesheet" href="visualisation/colors.css">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script src="node_modules/jquery/dist/jquery.js"></script>
    </head>

    <body>
        <header class="header">
            <logo class="logo">
                <a href="#"> <img style="height:100%;" src="pics/logo.png"> </a>
            </logo>
        </header>
        
<?php
        include("persistance/projects.php");
?>
            <content>
                <box> This is still in beta. Don't bitch!
                    <br>
                    <br><code>Ctr + &darr;</code> <code>Ctr + &rarr;</code> <code>Ctr + &larr;</code> <code onclick="saveProject(actualProjectId)">Save Project</code>
                    <br>
                    <br>
                    <item data-level="0" id="item-0" data-parent="" data-childCount="1">
                        <itemContainer id="masterContainer" data-item="item-0"> </itemContainer>
                    </item>
                    <br> </box>
            </content>
    </body>
    <script src="model/structit.js"></script>

    </html>