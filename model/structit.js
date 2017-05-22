var colors = ["purple", "blue", "grey", "teal", "green", "yellow", "orange", "pink"];
var actualProjectId;
//run onload functions
resizeMyAreas();
getProjects();
//
$(document).keydown(function (e) {
    var trigger = $(document.activeElement);
    if (e.ctrlKey && e.keyCode == 40) { //40 is down
        addElement(trigger, "child");
    }
    else
    if (e.ctrlKey && e.keyCode == 37) { //37 is left
        addElement(trigger, "above");
    }
    else
    if (e.ctrlKey && e.keyCode == 39) { //39 is right
        addElement(trigger, "below");
    }
    else
    if (e.ctrlKey && e.keyCode == 77) { //77  is m
        saveProject(actualProjectId);
        e.preventDefault();
    }
    else
    //Movements
    if (e.keyCode == 40 || e.keyCode == 39) { //40 is down
        moveTo(trigger, "data-next");
    }
    else
    if (e.ctrlKey != true && e.keyCode == 38) { //38 is up
        moveTo(trigger, "data-prev");
    }
    else
    if (e.keyCode == 37) { //37 is left
        moveTo(trigger, "data-parent");
    }
    else
    if (e.ctrlKey && e.keyCode == 46) { //46 is entf
        deleteElement(trigger);
    }
    else
    if (e.ctrlKey && e.keyCode == 32) { //space
        collapseBox(trigger);
    }
    else
    if (e.ctrlKey && e.keyCode == 81) { //q
        strikeToggle(trigger);
    }
    else {
        if ($(document.activeElement).prop("tagName") == "TEXTAREA") {
            setUnsavedChanges(true);
        }
    }
});
//KeyUp Function Save Values
$(document).keyup(function () {
    $(document.activeElement).on("keyup", function () {
        var active = document.activeElement;
        active.setAttribute("value", active.value);
    });
});
//Autosave Timer
window.setInterval(function () {
    if (actualProjectId != undefined) {
        saveProject(actualProjectId);
    }
}, 100000);

function addElement(trigger, type) {
    var parent = trigger.parent().parent();
    var oldFocus = parent;
    if (type != "child") {
        parent = parent.parent().closest("item");
    }
    if (parent.prop("tagName") == "ITEM") { //if an <item> is selected
        child = $(getNewChild(parent));
        if (type == "below") {
            addBelow(child, oldFocus);
        }
        if (type == "above") {
            addAbove(child, oldFocus);
        }
        if (type == "child") {
            addAsChild(child, oldFocus);
        }
        child.slideDown("fast");
        child.css("display","block");
        setFocus(child.attr("id"));
    }
    resizeMyAreas();
}

function resizeMyAreas() {
    $('textarea').each(function () {
        h(this);
    }).on('input', function () {
        h(this);
    });
}

function addBelow(child, parent) {
    child.insertAfter(parent);
    
    while (parent.attr("data-next") != "undefined" && ($("#"+parent.attr("data-next")).attr("data-level") > child.attr("data-level")) ) {
            parent = $("#" + parent.attr("data-next"));
        }
        
    
    var next = $("#" + parent.attr("data-next"));
    parent.attr("data-next", child.attr("id"));
    child.attr("data-prev", parent.attr("id"));
    child.attr("data-next", next.attr("id"));
    next.attr("data-prev", child.attr("id"));
}

function addAbove(child, parent) {
    child.insertBefore(parent);
    var prev = $("#" + parent.attr("data-prev"));
    parent.attr("data-prev", child.attr("id"));
    child.attr("data-next", parent.attr("id"));
    child.attr("data-prev", prev.attr("id"));
    prev.attr("data-next", child.attr("id"));
}

function addAsChild(child, parent) {
    $("itemContainer[data-item='" + parent.attr("id") + "']").prepend(child);
    var next = $("#" + parent.attr("data-next"));
    parent.attr("data-next", child.attr("id"));
    child.attr("data-prev", parent.attr("id"));
    child.attr("data-next", next.attr("id"));
    next.attr("data-prev", child.attr("id"));
}

function deleteElement(trigger) {
    var toDelete = trigger.parent().parent();
    if (toDelete.attr("id") != ("item-1")) { //To not delete the Mother of all
        var prev = $("#" + toDelete.attr("data-prev"));
        var next = $("#" + toDelete.attr("data-next"));
        while (next.attr("data-next") != "undefined" && (next.attr("data-level") > toDelete.attr("data-level")) ) {
            next = $("#" + next.attr("data-next"));
        }
        prev.attr("data-next", next.attr("id"));
        next.attr("data-prev", prev.attr("id"));
        setFocus(prev.attr("id"));
        toDelete.slideUp();
        toDelete.remove();
    }
}

function setFocus(id) {
    $("textarea[data-item='" + id + "']").focus();
    $(".highlight").removeClass("highlight");
    $("#" + id).addClass("highlight");
}

function getNewChild(parent) {
    var level = Number(parent.attr("data-level")) + 1;
    parent.attr("data-childCount", Number(parent.attr("data-childCount")) + 1);
    var id = parent.attr("id") + "-" + parent.attr("data-childCount");
    var parentId = parent.attr("id");
    var color = colors[level % colors.length];
    var toReturn = '<item style="display:none;" data-level="' + level + '" id="' + id + '" data-parent="' + parentId + '" data-childCount="0" data-prev="undefined" data-next="undefined">';
    toReturn += '<itemContent class="' + color + '" data-item="' + id + '">';
    toReturn += '<textarea rows="1" type="text" placeholder="Type some Topic" data-item="' + id + '"></textarea>';
    toReturn += '<delete class="icon" data-item="' + id + '">settings</delete>';
    toReturn += '</itemContent>';
    toReturn += '<itemContainer data-item="' + id + '">';
    toReturn += '</itemContainer>';
    toReturn += '</item>';
    return toReturn;
}

function moveTo(trigger, attribute) {
    trigger = trigger.parent().parent();
    setFocus(trigger.attr(attribute));
}

function h(e) { //This is for textarea auto resize
    $(e).css({
        'height': 'auto'
        , 'overflow-y': 'hidden'
    }).height(e.scrollHeight);
}

function collapseBox(trigger) {
    trigger = trigger.parent().parent();
    var box = $("itemContainer[data-item='" + trigger.attr("id") + "']");
    var icon = $("delete[data-item='" + trigger.attr("id") + "']");
    if (box.is(":visible")) {
        icon.html("keyboard_arrow_down");
    }
    else {
        icon.html("settings");
    }
    box.slideToggle();
}

function strikeToggle(trigger) {
    if (trigger.css("text-decoration") == "line-through") {
        trigger.css("text-decoration", "none");
    }
    else {
        trigger.css("text-decoration", "line-through");
    }
}