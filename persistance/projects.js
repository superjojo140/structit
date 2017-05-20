var unsavedChanges = false;
//Leave Side Message
window.onbeforeunload = function () {
    if (unsavedChanges == true) {
        return ' Sie haben ungespeicherte Änderungen - Möchten Sie die Seite wirklich verlassen?';
    }
};

function toggleNewProjectForm() {
    var addButton = $("#addProjectButton");
    if (addButton.attr("data-state") == "add") {
        $("addProject").slideDown();
        addButton.html("<icon>clear</icon>");
        addButton.attr("data-state", "cancel");
        $("#newProjectName").val("");
        $("#newProjectName").focus();
    }
    else if (addButton.attr("data-state") == "cancel") {
        $("addProject").slideUp();
        addButton.html("<icon>add</icon>Neu");
        addButton.attr("data-state", "add");
    }
}
$(document).on('click', 'project', function () {
    var id = $(this).attr('id');
    id = id.substring(7, id.length);
    actualProjectId = id;
    getProjectData(id);
});

function sendNewProject() {
    toggleNewProjectForm();
    var name = $('#newProjectName').val();
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            getProjects();
        }
    };
    xmlhttp.open("GET", "persistance/newProject.php?name=" + name, false);
    xmlhttp.send();
}

function getProjects(project) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("sidebarContent").innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", "persistance/getProjects.php?&project=" + project, false);
    xmlhttp.send();
}

function getProjectData(id) {
    if (unsavedChanges == false || confirm("Sie haben ungespeicherte Änderungen. Wollen Sie trotzdemfortfahren? Speichern mit Ctrl + M")) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $("#masterContainer").html(xmlhttp.responseText);
                $("textarea").each(function () {
                    $(this).val($(this).attr("value"));
                });
                setUnsavedChanges(false);
                $("textarea[data-item='item-1']").focus();
            }
        };
        xmlhttp.open("GET", "persistance/getProjectData.php?&project=" + id, false);
        xmlhttp.send();
    }
}

function saveProject(id) {
    if (id == undefined) {
        alert("Keine Id zum Speichern");
    }
    else {
        var uebergabe = new Array;
        uebergabe.push(id);
        uebergabe.push($('#masterContainer').html());
        $.ajax({
            type: "POST"
            , async: false
            , url: "persistance/saveProject.php"
            , data: {
                getData: uebergabe
            }
            , success: function (data) {
                showToast(data, "green");
                setUnsavedChanges(false);
            }
        });
    }
}

function deleteProject(id) {
    if (confirm("Soll das Projekt wirklich gelöscht werden?")) {
        var uebergabe = new Array;
        uebergabe.push(id);
        $.ajax({
            type: "POST"
            , async: false
            , url: "persistance/eleteProject.php"
            , data: {
                getData: uebergabe
            }
            , success: function (data) {
                getProjects();
            }
        });
    }
}

function setUnsavedChanges(wert) {
    unsavedChanges = wert;
}

function showToast(message, color) {
    var myToast = $("<toast style='display:none;' class='" + color + "'>" + message + "<taost>");
    $("snackbar").append(myToast);
    myToast.fadeIn();
    setTimeout(function () {
        hideToast(myToast);
    }, 2000);
}

function hideToast(obj) {
    obj.fadeOut();
}

function toggleSidebar() {
    var sidebar = $("sidebar");
    if (sidebar.is(":visible")) {
        $("#toggleSidebar").html("fullscreen_exit");
        $("content").animate({
            'margin-left': '0px'
            , 'width': '100%'
        });
        $("snackbar").animate({
            'margin-left': '40%'
            , 'border-width': '3px'
        });
    }
    else {
        $("#toggleSidebar").html("fullscreen");
        $("content").animate({
            'margin-left': '20%'
            , 'width': '80%'
        });
        $("snackbar").animate({
            'margin-left': '0%'
            , 'border-width': '0px'
        });
    }
    sidebar.animate({
        width: 'toggle'
    });
    $("header").slideToggle();
}