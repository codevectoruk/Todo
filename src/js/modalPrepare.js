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

function prepareModalRenameList(listId) {
  $("#modal-rename-list").val(listId);
  $("#modal-list-rename-input").val(todo[listId].list_name);
  closeAllDropdown();
  toggleRenameListModal();
}
