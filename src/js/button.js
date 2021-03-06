// function buttonIncreaseElementPosition(localListId, localElementId) {
//   reorderList(localListId, localElementId, "up");
// }

// function buttonDecreaseElementPosition(localListId, localElementId) {
//   reorderList(localListId, localElementId, "down");
// }

function buttonChangeElementStatusToOpen(listId, localElementId) {
  changeElementStatusToOpen(listId, localElementId);
  createListsAndElements();
}

function buttonChangeElementStatusToClosed(listId, localElementId) {
  changeElementStatusToClosed(listId, localElementId);
  createListsAndElements();
}

function buttonChangeElementStatusToDeleted() {
  var localListId = $("#modal-confirm-list").val();
  var localElementId = $("#modal-confirm-element").val();
  changeElementStatusToDeleted(localListId, localElementId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List item successfully deleted.", "success", 5000);
}

function buttonCreateList() {
  createList("New List");
  createListsAndElements();
}

function buttonDeleteList() {
  var localListId = $("#modal-confirm-list").val();
  deleteList(localListId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List successfully deleted.", "success", 5000);
}

//opens the modal in the update configuration
// buttonOpenElementModalForElementUpdate
// prepareModalUpdate
function buttonOpenElementModalForElementUpdate(
  localListId,
  localElementId,
  localElementStatus
) {
  var localElement = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
  resetElementModalUserAlert();
  $("#modal-list").val(localListId);
  $("#modal-element").val(localElementId);
  $("#modal-status").val(localElementStatus);
  $("#elementTitle").val(localElement.title);
  $("#elementDescription").val(localElement.description);
  setMarkdownDescription(localElement.description);
  $("#elementComments").val(localElement.comments);
  setMarkdownComments(localElement.comments);
  $("#elementCategory").val(parseInt(localElement.category));
  //$("#elementClassification").val(localElement.classification);
  //$("#elementUser").val(localElement.user);
  $("#elementDue").val(localElement.due);
  // $("#elementCreated").val(localElement.created);
  // $("#elementCategory").val(localElement.category);
  $("#element-modal-button-create").hide();
  $("#element-modal-button-update").show();
  $("#element-modal-update-title").show();
  $("#element-modal-create-title").hide();
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
  $("#elementTitle").focus();
}

//opens the modal in the create configuration
//prepareModalCreate
//buttonOpenElementModalForElementCreate
function buttonOpenElementModalForElementCreate(listId) {
  elementCreateFlag = true;
  resetElementModalUserAlert();
  $("#elementTitle").val("");
  $("#elementDescription").val("");
  setMarkdownDescription("");
  $("#elementComments").val("");
  setMarkdownComments("");
  $("#elementCategory").val(0);
  //$("#elementClassification").val("");
  //$("#elementUser").val("");
  $("#elementDue").val("");
  // $("#elementCreated").val("");
  // $("#elementCategory").val("");
  $("#element-modal-button-create").show();
  $("#element-modal-button-update").hide();
  $("#element-modal-update-title").hide();
  $("#element-modal-create-title").show();
  $("#modal-list").val(listId);
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
  $("#elementTitle").focus();
}

//button controls
// update button
function buttonUpdateElement() {
  var localListId = $("#modal-list").val();
  var localElementId = $("#modal-element").val();
  var localElementStatus = $("#modal-status").val();
  setElementTitle(
    localListId,
    localElementId,
    localElementStatus,
    $("#elementTitle").val()
  );
  setElementDescription(
    localListId,
    localElementId,
    localElementStatus,
    $("#elementDescription").val()
  );
  setElementComments(
    localListId,
    localElementId,
    localElementStatus,
    $("#elementComments").val()
  );
  setElementCategory(
    localListId,
    localElementId,
    localElementStatus,
    parseInt($("#elementCategory").val())
  );
  // setElementClassification(localListId, localElementId, localElementStatus, $("#elementClassification").val());
  // setElementUser(localListId, localElementId, localElementStatus, $("#elementUser").val());
  setElementDue(
    localListId,
    localElementId,
    localElementStatus,
    $("#elementDue").val()
  );
  // setElementCreated(localListId, localElementId, localElementStatus, $("#elementCreated").val());
  // setElementChecklist(localListId, localElementId, localElementStatus, $("#elementChecklist").val());
  toggleElementModalVisibility();
  createListsAndElements();
}

function buttonCreateNewElement() {
  var localListId = $("#modal-list").val();
  var localElementState = "open";
  var localElementTitle = $("#elementTitle").val();
  var localElementDescription = $("#elementDescription").val();
  var localElementComments = $("#elementComments").val();
  var localElementsCategory = parseInt($("#elementCategory").val());
  var localElementClassification = "";
  var localElementUser = "";
  var localElementDue = $("#elementDue").val();
  var localElementCreated = "";
  var localElementChecklist = "";
  createElement(
    localListId,
    localElementState,
    localElementTitle,
    localElementDescription,
    localElementComments,
    localElementsCategory,
    localElementClassification,
    localElementUser,
    localElementDue,
    localElementCreated,
    localElementChecklist
  );
  toggleElementModalVisibility();
  createListsAndElements();
  elementCreateFlag = false;
}

function buttonRenameList() {
  var localListId = $("#modal-rename-list").val();
  var localListName = $("#modal-list-rename-input").val();
  setListName(localListId, localListName);
  toggleRenameListModal();
  closeAllDropdown();
  createListsAndElements();
}

function buttonClearDueDate() {
  $("#elementDue").val("");
}
