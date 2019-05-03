//elementModalTextAreaUserSaveAlerts

function compareElementModalTextarea() {
    if(elementCreateFlag == false) {
        var localListId = $("#modal-list").val();
        var localElementId = $("#modal-element").val();
        var localElementStatus = $("#modal-status").val();
        var localElement = getElement(localListId, localElementId, localElementStatus);
        if(localElement.description != $("#elementDescription").val()){
            //console.log("desc diif");
            $("#elementDescriptionWarning").removeClass("hidden");
            $("#elementDescriptionWarning").addClass("flex");
            $("#elementDescription").addClass("user-save-alert-border");
        } else {
            $("#elementDescriptionWarning").addClass("hidden");
            $("#elementDescriptionWarning").removeClass("flex");
            $("#elementDescription").removeClass("user-save-alert-border");
        }
        if(localElement.comments != $("#elementComments").val()){
            $("#elementCommentsWarning").removeClass("hidden");
            $("#elementCommentsWarning").addClass("flex");
            $("#elementComments").addClass("user-save-alert-border");
        } else {
            $("#elementCommentsWarning").addClass("hidden");
            $("#elementCommentsWarning").removeClass("flex");
            $("#elementComments").removeClass("user-save-alert-border");
        }
    } else {
        console.log("no");
    }
}

function resetElementModalUserAlert() {
    $("#elementDescriptionWarning").addClass("hidden");
    $("#elementDescriptionWarning").removeClass("flex");
    $("#elementDescription").removeClass("user-save-alert-border");
    $("#elementCommentsWarning").addClass("hidden");
    $("#elementCommentsWarning").removeClass("flex");
    $("#elementComments").removeClass("user-save-alert-border");
}

$(document).on("keyup",function(e) {
    compareElementModalTextarea();
});
