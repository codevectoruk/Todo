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
    $("#modal-description").val(localElement.description);
    $(".button-create").hide();
    $(".button-save").show();
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
    $(".button-create").show();
    $(".button-save").hide();
    $("#modal-list").val(listId);
    closeAllDropdown();
    toggleElementModalVisibility();
    autosize.update($("#modal-description"));
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
