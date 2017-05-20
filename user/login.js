var redirectUrl = getParam("triggerUrl");
var adminNecessary = getParam("adminNecessary");
if (redirectUrl == false) {
    alert("Keine Weiterleitungs URL");
}
if (adminNecessary === false) { //Wenn der Get Parameter nicht gesetzt ist, gibt getParam() false zurück. Im Zweifel werden immer Adminrechte verlangt
    adminNecessary = "true";
}
/*

  ______                         _                
 |  ____|                       | |               
 | |__ ___  _ __ _ __ ___  _   _| | __ _ _ __ ___ 
 |  __/ _ \| '__| '_ ` _ \| | | | |/ _` | '__/ _ \
 | | | (_) | |  | | | | | | |_| | | (_| | | |  __/
 |_|  \___/|_|  |_| |_| |_|\__,_|_|\__,_|_|  \___|
                                                  
                                                  

*/
function showLogin() {
    document.getElementById("registerForm").setAttribute("style", "display:none;");
    document.getElementById("loginForm").setAttribute("style", "display:block;");
    document.getElementById("registerTab").className = "";
    document.getElementById("loginTab").className = "activeTab";
    document.getElementById("messageBox").setAttribute("style", "display:none;");
}

function showRegister() {
    document.getElementById("loginForm").setAttribute("style", "display:none;");
    document.getElementById("registerForm").setAttribute("style", "display:block;");
    document.getElementById("loginTab").className = "";
    document.getElementById("registerTab").className = "activeTab";
    document.getElementById("messageBox").setAttribute("style", "display:none;");
}
/*
  _                 _       
 | |               (_)      
 | |     ___   __ _ _ _ __  
 | |    / _ \ / _` | | '_ \ 
 | |___| (_) | (_| | | | | |
 |______\___/ \__, |_|_| |_|
               __/ |        
              |___/         
*/
function login() {
    var uebergabe = new Array;
    uebergabe.push($("#mainLoginUsername").val());
    uebergabe.push($("#mainLoginPassword").val());
    uebergabe.push(adminNecessary);
    $.ajax({
        type: "POST"
        , async: true
        , url: "loginAjax.php"
        , data: {
            getData: uebergabe
        }
        , success: function (data) {
            var json = JSON.parse(data);
            if (json.state == "ok") {
                window.location = redirectUrl;
            }
            else {
                $("#messageIcon").html(json.icon);
                $("#messageText").html(json.text);
                $("#messageBox").slideDown();
            }
        }
        , error: function (data) {
            $("#messageIcon").html("cancel");
            $("#messageText").html("Es ist ein unbekannter Fehler aufgetreten");
            $("#messageBox").slideDown();
        }
    });
}

function getParam(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}