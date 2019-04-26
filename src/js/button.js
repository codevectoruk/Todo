function buttonIncreaseElementPosition(localListId, localElementId) {
    reorderList(localListId, localElementId, "up");
}

function buttonDecreaseElementPosition(localListId, localElementId) {
    reorderList(localListId, localElementId, "down");
}

function buttonChangeElementStatusToOpen(listId, localElementId) {
    changeElementStatusToOpen(listId, localElementId);
    updateStoredTodoList();
    createListsAndElements();
}

function buttonChangeElementStatusToClosed(listId, localElementId) {
    changeElementStatusToClosed(listId, localElementId);
    updateStoredTodoList();
    createListsAndElements();
}

function buttonChangeElementStatusToDeleted() {
    var localListId = $("#modal-confirm-list").val();
    var localElementId = $("#modal-confirm-element").val();
    changeElementStatusToDeleted(localListId, localElementId);
    updateStoredTodoList();
    createListsAndElements();
    toggleConfirmationModalVisibility();
    generateUserAlert("List item successfully deleted.", "success", 5000);
}

function buttonCreateList() {
    createList('New List')
    updateStoredTodoList();
    createListsAndElements();
}

function buttonDeleteList() {
    var localListId = $("#modal-confirm-list").val();
    deleteList(localListId)
    createListsAndElements();
    toggleConfirmationModalVisibility();
    generateUserAlert("List successfully deleted.", "success", 5000);
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
    $("#due-date-input").val(localElement.due);
    $("#modal-description").val(localElement.description);
    $("#element-modal-button-create").hide();
    $("#element-modal-button-update").show();
    closeAllDropdown();
    toggleElementModalVisibility();
    autosize.update($("#modal-description"));
}

//opens the modal in the create configuration
//prepareModalCreate
//buttonOpenElementModalForElementCreate
function buttonOpenElementModalForElementCreate(listId) {
    $("#modal-title").val("");
    $("#modal-description").val("");
    $("#due-date-input").val("");
    $("#element-modal-button-create").show();
    $("#element-modal-button-update").hide();
    $("#modal-list").val(listId);
    closeAllDropdown();
    toggleElementModalVisibility();
    autosize.update($("#modal-description"));
}

//button controls
// update button
function buttonUpdateElement() {
    var localListId = $("#modal-list").val();
    var localElementId = $("#modal-element").val();
    var localElementStatus = $("#modal-status").val();
    setElementTitle(localListId,  localElementId, localElementStatus, $("#modal-title").val());
    setElementDescription(localListId,  localElementId, localElementStatus, $("#modal-description").val());
    // setElementComments(localListId, localElementId, localElementStatus, localElementComments);
    // setElementCategory(localListId, localElementId, localElementStatus, localElementsCategory);
    // setElementClassification(localListId, localElementId, localElementStatus, localElementClassification);
    // setElementUser(localListId, localElementId, localElementStatus, localElementUser);
    setElementDue(localListId,  localElementId, localElementStatus, $("#due-date-input").val());
    // setElementCreated(localListId, localElementId, localElementStatus, localElementCreated);
    // setElementChecklist(localListId, localElementId, localElementStatus, localElementChecklist);
    toggleElementModalVisibility();
    createListsAndElements();
}

function buttonCreateNewElement() {
    var localListId = $("#modal-list").val();
    var localElementState = "open";
    var localElementTitle = $("#modal-title").val();
    var localElementDescription = $("#modal-description").val();
    var localElementComments = "";
    var localElementsCategory = "";
    var localElementClassification = "";
    var localElementUser = "";
    var localElementDue = $("#due-date-input").val();
    var localElementCreated = "";
    var localElementChecklist = "";
    createElement(localListId, localElementState, localElementTitle, localElementDescription, localElementComments, localElementsCategory, localElementClassification, localElementUser, localElementDue, localElementCreated, localElementChecklist);
    toggleElementModalVisibility();
    createListsAndElements();
}

function buttonRenameList() {
  var localListId = $("#modal-rename-list").val();
   var localListName = $("#modal-list-rename-input").val();
  setListName(localListId, localListName)
    createListsAndElements();
    toggleRenameListModal();
}
