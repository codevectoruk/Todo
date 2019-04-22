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
    "onclick=\"prepareModalDeleteList(" +
    localListId +
    ")\">Delete List</div></div></div></div><div class=\"list-body scrollbar\" " +
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
