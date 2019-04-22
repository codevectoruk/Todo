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
  generateUserAlert("List item successfully deleted.", "success", 5000);
}

//opens the modal in the create configuration
function prepareModalDelete(localListId, localElementId) {
  $("#modal-confirm-list").val(localListId);
  $("#modal-confirm-element").val(localElementId);
  $("#deleteElementButton").show();
  $("#deleteListButton").hide();
  closeAllDropdown()
  toggleConfirmationModalVisibility();
}

function prepareModalDeleteList(localListId) {
  $("#modal-confirm-list").val(localListId);
  $("#deleteElementButton").hide();
  $("#deleteListButton").show();
  closeAllDropdown()
  toggleConfirmationModalVisibility();
}

function deleteList() {
  listId = $("#modal-confirm-list").val();
  todo.splice(listId, 1);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List successfully deleted.", "success", 5000);
}