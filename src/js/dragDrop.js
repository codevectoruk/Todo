function elementOnDragStartEvent(
  event,
  localListId,
  localElementId,
  localElementStatus
) {
  event.dataTransfer.setData("localListId", localListId);
  event.dataTransfer.setData("localElementId", localElementId);
  event.dataTransfer.setData("localElementStatus", localElementStatus);
  //console.log(event.target.id);

  $("#" + event.target.id).addClass("hideListElement");
  //   $("#" + event.target.id).addClass("hidden");
  //$("#" + event.target.id).append(populateListElementPlaceholder());
  //console.log($("#list-" + localListId));
  //console.log(localElementId);
  //console.log($("#list-" + localListId)[0].children[0]);

  $(populateListElementPlaceholder()).insertAfter(
    $("#list-" + localListId)[0].children[localElementId]
  );
  //   $("#list-" + localListId)[0].children[localElementId]
  //   $("#list-" + localListId).insertBefore(
  //     populateListElementPlaceholder(),
  //     $("#list-" + localListId)[0].children[localElementId]
  //   );

  //parentElement.insertBefore(newElement, parentElement.children[2]);
}

function allowDrop(event) {
  event.preventDefault();
}

function elementDragEnd(event) {
  createListsAndElements();
}

function listOnDropEvent(event, destList) {
  var localListId = event.dataTransfer.getData("localListId");
  var localElementId = event.dataTransfer.getData("localElementId");
  var localElementStatus = event.dataTransfer.getData("localElementStatus");
  if (destList != localListId) {
    //stop elements moving to the same list (for now...)
    createElement(
      destList,
      localElementStatus,
      getElementTitle(localListId, localElementId, localElementStatus),
      getElementDescription(localListId, localElementId, localElementStatus),
      getElementComments(localListId, localElementId, localElementStatus),
      getElementCategory(localListId, localElementId, localElementStatus),
      getElementClassification(localListId, localElementId, localElementStatus),
      getElementUser(localListId, localElementId, localElementStatus),
      getElementDue(localListId, localElementId, localElementStatus),
      getElementCreated(localListId, localElementId, localElementStatus),
      getElementChecklist(localListId, localElementId, localElementStatus)
    );
    deleteElement(localListId, localElementId, localElementStatus);
  }
  createListsAndElements();
}
