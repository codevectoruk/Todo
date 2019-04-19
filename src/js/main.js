var todoListExample = [
    {
        "list_name": "Default List",
        "openElements": [
            {
                "title": "This is an item that is yet to be completed",
                "description": "This is the description for the item that is yet to be completed",
                "classification": "",
                "user": "",
                "due": "",
                "created": "",
                "checklist": [
                    {
                        "name": "checklist Item 1",
                        "status": "unchecked"
                    }
                ]
            }
        ],
        "closedElements": [{
            "title": "This is an item that has been completed",
            "description": "This is the description for the item that has been completed",
            "classification": "",
            "user": "",
            "due": "",
            "created": "",
            "checklist": [
                {
                    "name": "checklist Item 1",
                    "status": "unchecked"
                }
            ]
        }],
        "deletedElements": []
    }
];

var todo = JSON.parse(localStorage.getItem('todo'));
function firstTimeLoadLocalStorage() {
    if (localStorage.getItem("todo") == null) {
        localStorage.setItem('todo', JSON.stringify(todoListExample));
        todo = JSON.parse(localStorage.getItem('todo'));
    }
}

function createListsAndElements() {
    updateStoredTodoList();
    $(".list-container").empty();
    $.each(todo, function(i, field) {
        //create the list
        var output = "<div class=\"list\"><div class=\"list-header\"><div class=\"list-title\">"
        + field.list_name
        + "</div><div class=\"button-container\"><div class=\"list-button\" onclick=\"toggleDropdown("
        +  i
        + ")\"><i class=\"fas fa-ellipsis-h\"></i></div><div class=\"dropdown hidden\" id=\"id-dropdown-"
        + i
        + "\"><div class=\"dropdown-title\"><div class=\"dropdown-title-text\">List Actions</div><i class=\"fas fa-times\" onclick=\"toggleDropdown("
        + i
        + ")\"></i></div><div class=\"dropdown-element\" onclick=\"prepareModalRenameList("
        + i
        + ")\">Rename List</div><div class=\"dropdown-element\" onclick=\"deleteList("
        + i
        + ")\">Delete List</div></div></div></div><div class=\"list-body\" id=\"list-"
        + i + "\"></div><div class=\"list-footer\" onclick=\"prepareModalCreate("
        +  i
        + ")\"><i class=\"fas fa-plus\"></i> Add another item</div></div>";
        $(".list-container").append(output);
        // access the elements of the list
        var outputOpen = "";
        var outputClosed = "";
        $.each(field.openElements, function(i2, field2) {
            outputOpen += "<div class='list-element status-open'><div class='status' onclick='elementStatusToClosed("
            + i
            + ", "
            + i2
            + ")'><i class=\"far fa-square\"></i></div><div class='title' onclick='prepareModalUpdate("
            +  i
            + ", "
            + i2
            + ", \"open\""
            + ")'>"
            + field2.title
            + "</div><div class='position'><div class='position-up position-element' onclick='increaseElementPosition("
            + i
            + ", "
            + i2
            + ")'><i class='fas fa-caret-up'></i></div><div class='position-down position-element'onclick='decreaseElementPosition("
            + i
            + ", "
            + i2
            + ")'><i class='fas fa-caret-down'></i></div></div></div>";
        });
        $("#list-" + i).append(outputOpen);
        $.each(field.closedElements, function(i2, field2) {
            outputClosed += "<div class='list-element status-closed'><div class='status' onclick='elementStatusToOpen("
            + i
            + ", "
            + i2
            + ")'><i class=\"fas fa-check-square\"></i></div><div class='title title-closed' onclick='prepareModalUpdate("
            +  i
            + ", "
            + i2
            + ", \"closed\""
            + ")'>"
            + field2.title
            + "</div><div class='position'><div class='promote' onclick='prepareModalDelete("
            + i
            + ", "
            + i2
            + ")'><i class=\"fas fa-trash\"></i></div></div></div>";
        });
        $("#list-" + i).append(outputClosed);
    });
    $(".list-container").append("<div class=\"add-list\" onclick=\"createNewList()\"><i class=\"fas fa-plus\"></i> Add another item</div>");
}

function reorderList(listId, element, direction) {
    $.each(todo, function(i, field) {
        // if the searched for list matches one in the todo list
        if(i == listId) {
            //var localElements = field.elements;
            if(direction == "up" && element != 0 && field.openElements.length > 1) {
                var selectedElementUp = field.openElements[element];
                var swapElementUp = field.openElements[element - 1];

                field.openElements[element] = swapElementUp;
                field.openElements[element - 1] = selectedElementUp;
            }
            if(direction == "down" && element != (field.openElements.length - 1) && field.openElements.length > 1) {
                var selectedElementDown = field.openElements[element];
                var swapElementDown = field.openElements[element + 1];

                field.openElements[element] = swapElementDown;
                field.openElements[element + 1] = selectedElementDown;
            }
        }
    });
    createListsAndElements();
}

function increaseElementPosition(listId, element){
    reorderList(listId, element, "up");
}
function decreaseElementPosition(listId, element){
    reorderList(listId, element, "down");
}

function createNewList() {
    if(todo.length < 5) {
        todo.push({
            "list_name": "New List",
            "openElements": [],
            "closedElements": [],
            "deletedElements": []
        });
        createListsAndElements();
    }
}

function updateStoredTodoList() {
    localStorage.setItem('todo', JSON.stringify(todo));
}

function changeElementStatus(listId, element, toStatus) {
    var storedListOpen = findElementList(listId, "open");
    var storedListClosed = findElementList(listId, "closed");
    var storedListDeleted = findElementList(listId, "deleted");
    var storedElement = null;
    if(toStatus == "open"){
        storedElement = findElement(listId, element, "closed");
        if(storedElement != null) {
            storedListClosed.splice(element,1);
            storedListOpen.push(storedElement);
        } else {
            console.log("null");
        }
    }
    if(toStatus == "closed"){
        storedElement = findElement(listId, element, "open");
        storedListOpen.splice(element,1);
        storedListClosed.push(storedElement);
    }
    if(toStatus == "deleted"){
        storedElement = findElement(listId, element, "closed");
        storedListClosed.splice(element,1);
        storedListDeleted.push(storedElement);
    }
    createListsAndElements();
}

function elementStatusToDeleted(listId, element) {
    changeElementStatus(listId, element, "deleted");
}

function elementStatusToClosed(listId, element) {
    changeElementStatus(listId, element, "closed");
}

function elementStatusToOpen(listId, element) {
    changeElementStatus(listId, element, "open");
}

//toggles the element modal visibility
function toggleElementModalVisibility() {
    if($("#id-element-modal").hasClass("hidden")) {
        $("#id-element-modal").addClass("flex");
        $("#id-element-modal").removeClass("hidden");
    } else {
        $("#id-element-modal").removeClass("flex");
        $("#id-element-modal").addClass("hidden");
    }
}

//toggles the confirmation modal visibility
function toggleConfirmationModalVisibility() {
    if($("#id-confirmation-modal").hasClass("hidden")) {
        $("#id-confirmation-modal").addClass("flex");
        $("#id-confirmation-modal").removeClass("hidden");
    } else {
        $("#id-confirmation-modal").removeClass("flex");
        $("#id-confirmation-modal").addClass("hidden");
    }
}

//opens the modal in the update configuration
function prepareModalUpdate(listId, element, status, title, description) {
    var localElement = findElement(listId, element, status);
    $("#modal-title").val(localElement.title);
    $("#modal-list").val(listId);
    $("#modal-element").val(element);
    $("#modal-status").val(status);
    if(localElement.description != ""){
        $("#modal-description").val(localElement.description);
    }
    $(".button-create").hide();
    $(".button-save").show();
    toggleElementModalVisibility();
}

//opens the modal in the create configuration
function prepareModalCreate(listId) {
    $("#modal-title").val("");
    $("#modal-description").val("");
    $(".button-create").show();
    $(".button-save").hide();
    $("#modal-list").val(listId);
    toggleElementModalVisibility();
}

//opens the modal in the create configuration
function prepareModalDelete(listId, element) {
    $("#modal-confirm-list").val(listId);
    $("#modal-confirm-element").val(element);
    toggleConfirmationModalVisibility();
}

//button controls
// confirm button
function deleteElement() {
    var listId = $("#modal-confirm-list").val();
    var element = $("#modal-confirm-element").val();
    elementStatusToDeleted(listId, element);
    toggleConfirmationModalVisibility();
}

//button controls
// update button
function updateElement() {
    var listId = $("#modal-list").val();
    var element = $("#modal-element").val();
    var status = $("#modal-status").val();
    var localElement = findElement(listId, element, status);
    localElement.title = $("#modal-title").val();
    localElement.description = $("#modal-description").val();
    toggleElementModalVisibility();
    createListsAndElements();
}

//button controls
// create button
function createNewElement() {
    var listId = $("#modal-list").val();
    var title = $("#modal-title").val();
    var description = $("#modal-description").val();
    var localList = findElementList(listId, "open");
    if(title != ""){
        localList.push({
            "title": title,
            "description": description,
            "classification": "OS",
            "user": "Edward Wright",
            "due": "7/4/2019",
            "created": "1/4/2019",
            "checklist": [
                {
                    "name": "checklist Item 1",
                    "status": "unchecked"
                },
                {
                    "name": "checklist Item 2",
                    "status": "checked"
                }
            ]
        });
        toggleElementModalVisibility();
        createListsAndElements();
    }
}

function findElementList(listId, status) {
    var returnState = null;
    if(status === "open"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                returnState = todo[i].openElements;
            }
        });
    }
    if(status === "closed"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                returnState = todo[i].closedElements;
            }
        });
    }
    if(status === "deleted"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                returnState = todo[i].deletedElements;
            }
        });
    }
    return returnState;
}

function findElement(listId, element, status) {
    var returnState = null;
    if(status == "open"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                $.each(field.openElements, function(i2, field2) {
                    if(i2 == element) {
                        returnState = todo[i].openElements[i2];
                    }
                });
            }
        });
    }
    if(status == "closed"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                $.each(field.closedElements, function(i2, field2) {
                    if(i2 == element) {
                        returnState = todo[i].closedElements[i2];
                    }
                });
            }
        });
    }
    if(status == "deleted"){
        $.each(todo, function(i, field) {
            // if the searched for list matches one in the todo list
            if(i == listId) {
                $.each(field.closedElements, function(i2, field2) {
                    if(i2 == element) {
                        returnState = todo[i].deletedElements[i2];
                    }
                });
            }
        });
    }
    return returnState;
}

function findList(listId) {
    var returnState = null;
    $.each(todo, function(i, field) {
        // if the searched for list matches one in the todo list
        if(i == listId) {
            returnState = todo[i];
        }
    });
    return returnState;
}

function toggleDropdown(id) {
    if($("#id-dropdown-" + id).hasClass("hidden")) {
        // hide all other dropdowns
        $(".dropdown").removeClass("flex");
        $(".dropdown").addClass("hidden");
        //show this dropdown
        $("#id-dropdown-" + id).addClass("flex");
        $("#id-dropdown-" + id).removeClass("hidden");
    } else {
        //hide this dropdown
        $("#id-dropdown-" + id).removeClass("flex");
        $("#id-dropdown-" + id).addClass("hidden");
    }
}

function toggleRenameListModal() {
    if($("#id-rename-modal").hasClass("hidden")) {
        $("#id-rename-modal").addClass("flex");
        $("#id-rename-modal").removeClass("hidden");
    } else {
        $("#id-rename-modal").removeClass("flex");
        $("#id-rename-modal").addClass("hidden");
    }
}

function prepareModalRenameList(listId) {
    $("#modal-rename-list").val(listId);
    $("#modal-list-rename-input").val(todo[listId].list_name);
    toggleRenameListModal();
}

function deleteList(listId) {
    var list = findList(listId);
    todo.splice(listId,1);
    createListsAndElements();
}

function renameList() {
    var listId = $("#modal-rename-list").val();
    var list = findList(listId);
    var newTitle = $("#modal-list-rename-input").val();
    if(newTitle != ""){
        list.list_name = newTitle;
        createListsAndElements();
        toggleRenameListModal();
    }
}

firstTimeLoadLocalStorage();
createListsAndElements();
autosize($('textarea'));
