<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="persistance/projects.css">
<script src="persistance/projects.js"></script>
<sidebar>
    <sideTopBar>
        <div>Deine Projekte</div>
        <div id="addProjectButton" onclick="toggleNewProjectForm()" data-state="add">
            <icon class="textIcon">add</icon>Neu </div>
    </sideTopBar>
    <addProject>
        <form id="addProjectForm" action="javascript:sendNewProject()">
            <input id="newProjectName" type="text" placeholder="Neuer Name">
            <icon id="sendNewProject" onclick="sendNewProject()">send</icon>
        </form>
    </addProject>
    <sidebarContent id="sidebarContent"> </sidebarContent>
</sidebar>
<div id="toggleSidebar" class="icon" title="Vollbild" onclick="toggleSidebar()">fullscreen</div>
<snackbar> </snackbar>