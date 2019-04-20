var todo = JSON.parse(localStorage.getItem("todo"));
createListsAndElements();
autosize($("textarea"));

//@prepros-append defaultSetup.js
//@prepros-append manageElementsAndLists.js
//@prepros-append findElementsAndLists.js
//@prepros-append dropdownDeleteAndRenameLists.js
//@prepros-append elementModal.js
//@prepros-append confirmModal.js

function updateStoredTodoList() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

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


function firstTimeLoadLocalStorage() {
    if (localStorage.getItem("todo") === null) {
        localStorage.setItem("todo", JSON.stringify(todoListExample));
        todo = JSON.parse(localStorage.getItem("todo"));
    }
}
firstTimeLoadLocalStorage();

function createListsAndElements() {
    updateStoredTodoList();
    $(".list-container").empty();
    $.each(todo, function (listId, listFields) {
        //create the list
        var output = createListFromJson(listId, listFields);
        $(".list-container").append(output);
        // access the elements of the list
        var outputOpen = "";
        var outputClosed = "";
        $.each(listFields.openElements, function (elementId, elementFields) {
            outputOpen += createElementsFromJson(listId, elementId, elementFields, "open");
        });
        $("#list-" + listId).append(outputOpen);
        $.each(listFields.closedElements, function (elementId, elementFields) {
            outputClosed += createElementsFromJson(listId, elementId, elementFields, "closed");
        });
        $("#list-" + listId).append(outputClosed);
    });
    $(".list-container").append("<div class=\"add-list\" " +
    "onclick=\"createNewList()\"><i class=\"fas fa-plus\"></i> " +
    "Add another item</div>");
}

function createListFromJson(localListId, localListFields) {
    var returnState = "";
    returnState = "<div class=\"list\"><div class=\"list-header\">" +
    "<div class=\"list-title\">" +
    localListFields.list_name +
    "</div><div class=\"button-container\"><div class=\"list-button\" " +
    "onclick=\"toggleDropdown(" +
    localListId +
    ")\"><i class=\"fas fa-ellipsis-h\"></i></div><div " +
    "class=\"dropdown hidden\" id=\"id-dropdown-" +
    localListId +
    "\"><div class=\"dropdown-title\"><div " +
    "class=\"dropdown-title-text\">List Actions</div><i " +
    "class=\"fas fa-times\" onclick=\"toggleDropdown(" +
    localListId +
    ")\"></i></div><div class=\"dropdown-element\" " +
    "onclick=\"prepareModalRenameList(" +
    localListId +
    ")\">Rename List</div><div class=\"dropdown-element\" " +
    "onclick=\"deleteList(" +
    localListId +
    ")\">Delete List</div></div></div></div><div class=\"list-body\" " +
    "id=\"list-" +
    localListId +
    "\"></div><div class=\"list-footer\" onclick=\"buttonOpenElementModalForElementCreate(" +
    localListId +
    ")\"><i class=\"fas fa-plus\"></i> Add another item</div></div>";
    return returnState;
}

function createElementsFromJson(localListId, localElementId, localElementFields, localElementStatus) {
    var returnState = "";
    var statusStringA = "";
    var statusStringB = "";
    var statusStringC = "";
    var statusStringD = "";
    if(localElementStatus === "open"){
        statusStringA = "status-open";
        statusStringB = "elementStatusToClosed";
        statusStringC = "far fa-square";
        statusStringD = "open";
    }
    if(localElementStatus === "closed"){
        statusStringA = "status-closed";
        statusStringB = "elementStatusToOpen";
        statusStringC = "fas fa-check-square";
        statusStringD = "closed";
    }
    returnState = "<div class='list-element " +
    statusStringA +
    "'><div class='status' onclick='" +
    statusStringB +
    "(" +
    localListId +
    ", " +
    localElementId +
    ")'><i class=\"" +
    statusStringC +
    "\"></i></div><div class='title' onclick='buttonOpenElementModalForElementUpdate(" +
    localListId +
    ", " +
    localElementId +
    ", \"" +
    statusStringD +
    "\")'>" +
    localElementFields.title +
    "</div><div class='position'>";
    if(localElementStatus === "open"){
        returnState += "<div class='position-up position-element' onclick='increaseElementPosition(" +
        localListId +
        ", " +
        localElementId +
        ")'><i class='fas fa-caret-up'></i></div><div class='position-down position-element' onclick='decreaseElementPosition(" +
        localListId +
        ", " +
        localElementId +
        ")'><i class='fas fa-caret-down'></i></div>";
    }
    if(localElementStatus === "closed"){
        returnState += "<div class='promote' onclick='prepareModalDelete(" +
        localListId +
        ", " +
        localElementId +
        ")'><i class=\"fas fa-trash\"></i></div></div>";
    }
    returnState += "</div></div>";
    return returnState;
}

function reorderList(localListId, localElementId, direction) {
    $.each(todo, function (listId, listFields) {
        // if the searched for list matches one in the list
        if (listId === parseInt(localListId)) {
            //var localElements = listFields.elements;
            if (direction === "up" && localElementId !== 0 && listFields.openElements.length > 1) {
                var selectedElementUp = listFields.openElements[localElementId];
                var swapElementUp = listFields.openElements[localElementId - 1];

                listFields.openElements[localElementId] = swapElementUp;
                listFields.openElements[localElementId - 1] = selectedElementUp;
            }
            if (direction === "down" && localElementId !== (listFields.openElements.length - 1) && listFields.openElements.length > 1) {
                var selectedElementDown = listFields.openElements[localElementId];
                var swapElementDown = listFields.openElements[localElementId + 1];

                listFields.openElements[localElementId] = swapElementDown;
                listFields.openElements[localElementId + 1] = selectedElementDown;
            }
        }
    });
    createListsAndElements();
}

function increaseElementPosition(localListId, localElementId) {
    reorderList(localListId, localElementId, "up");
}
function decreaseElementPosition(localListId, localElementId) {
    reorderList(localListId, localElementId, "down");
}

function changeElementStatus(listId, element, toStatus) {
    var storedListOpen = findElementList(listId, "open");
    var storedListClosed = findElementList(listId, "closed");
    var storedListDeleted = findElementList(listId, "deleted");
    var storedElement = null;
    if (toStatus === "open") {
        storedElement = findElement(listId, element, "closed");
        if (storedElement !== null) {
            storedListClosed.splice(element, 1);
            storedListOpen.push(storedElement);
        }
    }
    if (toStatus === "closed") {
        storedElement = findElement(listId, element, "open");
        storedListOpen.splice(element, 1);
        storedListClosed.push(storedElement);
    }
    if (toStatus === "deleted") {
        storedElement = findElement(listId, element, "closed");
        storedListClosed.splice(element, 1);
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

function createNewList() {
    if (todo.length < 5) {
        todo.push({
            "list_name": "New List",
            "openElements": [],
            "closedElements": [],
            "deletedElements": []
        });
        createListsAndElements();
    }
}

function findElementList(listId, status) {
    var returnState = null;
    if (status === "open") {
        $.each(todo, function (i) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                returnState = todo[i].openElements;
            }
        });
    }
    if (status === "closed") {
        $.each(todo, function (i) {
            // if the searched for list matches one in thelist
            if (i === parseInt(listId)) {
                returnState = todo[i].closedElements;
            }
        });
    }
    if (status === "deleted") {
        $.each(todo, function (i) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                returnState = todo[i].deletedElements;
            }
        });
    }
    return returnState;
}

function findElement(listId, element, status) {
    var returnState = null;
    if (status === "open") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.openElements, function (i2) {
                    if (i2 === parseInt(element)) {
                        returnState = todo[i].openElements[i2];
                    }
                });
            }
        });
    }
    if (status === "closed") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.closedElements, function (i2) {
                    if (i2 === parseInt(element)) {
                        returnState = todo[i].closedElements[i2];
                    }
                });
            }
        });
    }
    if (status === "deleted") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.closedElements, function (i2) {
                    if (i2 === parseInt(element)) {
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
    $.each(todo, function (i) {
        // if the searched for list matches one in the list
        if (i === parseInt(listId)) {
            returnState = todo[i];
        }
    });
    return returnState;
}

function toggleDropdown(id) {
    if ($("#id-dropdown-" + id).hasClass("hidden")) {
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
    if ($("#id-rename-modal").hasClass("hidden")) {
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
    todo.splice(listId, 1);
    createListsAndElements();
}

function renameList() {
    var listId = $("#modal-rename-list").val();
    var list = findList(listId);
    var newTitle = $("#modal-list-rename-input").val();
    if (newTitle !== "") {
        list.list_name = newTitle;
        createListsAndElements();
        toggleRenameListModal();
    }
}

//toggles the element modal visibility
function toggleElementModalVisibility() {
    if ($("#id-element-modal").hasClass("hidden")) {
        $("#id-element-modal").addClass("flex");
        $("#id-element-modal").removeClass("hidden");
    } else {
        $("#id-element-modal").removeClass("flex");
        $("#id-element-modal").addClass("hidden");
    }
}

//opens the modal in the update configuration
// buttonOpenElementModalForElementUpdate
// prepareModalUpdate
function buttonOpenElementModalForElementUpdate(listId, element, status) {
    var localElement = findElement(listId, element, status);
    $("#modal-title").val(localElement.title);
    $("#modal-list").val(listId);
    $("#modal-element").val(element);
    $("#modal-status").val(status);
    if (localElement.description !== "") {
        $("#modal-description").val(localElement.description);
    }
    $(".button-create").hide();
    $(".button-save").show();
    toggleElementModalVisibility();
}

//opens the modal in the create configuration
//prepareModalCreate
//buttonOpenElementModalForElementCreate
function buttonOpenElementModalForElementCreate(listId) {
    $("#modal-title").val("");
    $("#modal-description").val("");
    $(".button-create").show();
    $(".button-save").hide();
    $("#modal-list").val(listId);
    toggleElementModalVisibility();
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
    if (title !== "") {
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

//toggles the confirmation modal visibility
function toggleConfirmationModalVisibility() {
    if ($("#id-confirmation-modal").hasClass("hidden")) {
        $("#id-confirmation-modal").addClass("flex");
        $("#id-confirmation-modal").removeClass("hidden");
    } else {
        $("#id-confirmation-modal").removeClass("flex");
        $("#id-confirmation-modal").addClass("hidden");
    }
}

//button controls
// confirm button
function deleteElement() {
    var listId = $("#modal-confirm-list").val();
    var element = $("#modal-confirm-element").val();
    elementStatusToDeleted(listId, element);
    toggleConfirmationModalVisibility();
}

//opens the modal in the create configuration
function prepareModalDelete(listId, element) {
    $("#modal-confirm-list").val(listId);
    $("#modal-confirm-element").val(element);
    toggleConfirmationModalVisibility();
}

