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
