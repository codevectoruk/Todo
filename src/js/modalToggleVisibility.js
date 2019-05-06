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

//toggles the element modal visibility
function toggleElementModalVisibility() {
  if ($("#id-element-modal").hasClass("hidden")) {
    $("#id-element-modal").addClass("flex");
    $("#id-element-modal").removeClass("hidden");
  } else {
    $("#id-element-modal").removeClass("flex");
    $("#id-element-modal").addClass("hidden");
    elementCreateFlag = false;

    $("#elementDescription").removeClass("flex");
    $("#elementDescription").addClass("hidden");
    $("#elementComments").removeClass("flex");
    $("#elementComments").addClass("hidden");

    $("#elementDescriptionMarkdownContainer").addClass("flex");
    $("#elementDescriptionMarkdownContainer").removeClass("hidden");
    $("#elementCommentsMarkdownContainer").addClass("flex");
    $("#elementCommentsMarkdownContainer").removeClass("hidden");
  }
}

function closeAllModals() {
  $(".modal-container").removeClass("flex");
  $(".modal-container").addClass("hidden");
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

function toggleDropdown(buttonId) {
  if ($("#id-dropdown-" + buttonId).hasClass("hidden")) {
    // hide all other dropdowns
    closeAllDropdown();
    //show this dropdown
    $("#id-dropdown-" + buttonId).removeClass("hidden");
    $("#id-dropdown-" + buttonId).addClass("flex");
  } else {
    //hide this dropdown
    $("#id-dropdown-" + buttonId).removeClass("flex");
    $("#id-dropdown-" + buttonId).addClass("hidden");
  }
}
