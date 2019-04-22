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

function closeAllDropdown() {
  $(".dropdown").removeClass("flex");
  $(".dropdown").addClass("hidden");
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
  closeAllDropdown();
  toggleRenameListModal();
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