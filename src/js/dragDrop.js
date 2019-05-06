var globalListenToDrag = false;

function elementOnDragStartEvent(
  event,
  localListId,
  localElementId,
  localElementStatus
) {
  event.dataTransfer.setData("localListId", localListId);
  event.dataTransfer.setData("localElementId", localElementId);
  event.dataTransfer.setData("localElementStatus", localElementStatus);
  globalListenToDrag = true;
  var localStatusIdCode = 0;
  if (localElementStatus == "open") {
    localStatusIdCode = 0;
  } else if (localElementStatus == "closed") {
    localStatusIdCode = 1;
  }
  $(populateListElementPlaceholder()).insertAfter(
    $("#" + localListId + "-" + localElementId + "-" + localStatusIdCode)
  );
}

function allowDrop(event) {
  if (globalListenToDrag) {
    event.preventDefault();
  }
}

function onElementDragOver(
  event,
  localListId,
  localElementId,
  localElementStatus
) {
  var listen = globalListenToDrag;
  if (listen) {
    var localStatusIdCode = 0;
    if (localElementStatus == "open") {
      localStatusIdCode = 0;
    } else if (localElementStatus == "closed") {
      localStatusIdCode = 1;
    }
    //remove old placeholder
    $(".list-element-placeholder").remove();
    $(".list-element-drop").remove();
    //add new placeholder
    $(
      populateListElementDrop(localListId, localElementId, localElementStatus)
    ).insertBefore(
      $("#" + localListId + "-" + localElementId + "-" + localStatusIdCode)
    );
  }
}

function onPlaceholderDragOver() {
  $(".list-element-drop").remove();
}

function elementonDropEvent(
  event,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  var localListId = event.dataTransfer.getData("localListId");
  var localElementId = event.dataTransfer.getData("localElementId");
  var localElementStatus = event.dataTransfer.getData("localElementStatus");

  if (localListId == localListIdDest) {
    moveWithinList(
      localListId,
      localElementId,
      localElementStatus,
      localListIdDest,
      localElementIdDest,
      localElementStatusDest
    );
  } else {
    moveListToList(
      localListId,
      localElementId,
      localElementStatus,
      localListIdDest,
      localElementIdDest,
      localElementStatusDest
    );
  }
}

function elementDragEnd(event) {
  globalListenToDrag = false;
  createListsAndElements();
}

function listOnDropEvent(event, destList) {
  // var localListId = event.dataTransfer.getData("localListId");
  // var localElementId = event.dataTransfer.getData("localElementId");
  // var localElementStatus = event.dataTransfer.getData("localElementStatus");
  // if (destList != localListId) {
  //   //stop elements moving to the same list (for now...)
  //   createElement(
  //     destList,
  //     localElementStatus,
  //     getElementTitle(localListId, localElementId, localElementStatus),
  //     getElementDescription(localListId, localElementId, localElementStatus),
  //     getElementComments(localListId, localElementId, localElementStatus),
  //     getElementCategory(localListId, localElementId, localElementStatus),
  //     getElementClassification(localListId, localElementId, localElementStatus),
  //     getElementUser(localListId, localElementId, localElementStatus),
  //     getElementDue(localListId, localElementId, localElementStatus),
  //     getElementCreated(localListId, localElementId, localElementStatus),
  //     getElementChecklist(localListId, localElementId, localElementStatus)
  //   );
  //   deleteElement(localListId, localElementId, localElementStatus);
  // }
  // createListsAndElements();
}

function moveWithinList(
  localListId,
  localElementId,
  localElementStatus,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  //if same status
  var itemBeingMoved = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
  var list = getElementList(localListIdDest, localElementStatus);
  if (localElementStatus == localElementStatusDest) {
    // splice to new pos
    list.splice(localElementIdDest, 0, itemBeingMoved);
    if (localElementIdDest < localElementId) {
      var elementModifier = parseInt(localElementId) + 1;
      deleteElement(localListId, elementModifier, localElementStatus);
    }
    if (localElementIdDest > localElementId) {
      deleteElement(localListId, localElementId, localElementStatus);
    }
  } else {
    //append to same status as original
    list.push(itemBeingMoved);
    deleteElement(localListId, localElementId, localElementStatus);
  }
}

function moveListToList(
  localListId,
  localElementId,
  localElementStatus,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  //if same status
  var itemBeingMoved = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
  var list = getElementList(localListIdDest, localElementStatus);
  if (localElementStatus == localElementStatusDest) {
    //add dragged item to new list in new position
    list.splice(localElementIdDest, 0, itemBeingMoved);
  } else {
    // append to new list but old status
    list.push(itemBeingMoved);
  }
  //remove dragged item from old list
  deleteElement(localListId, localElementId, localElementStatus);
}
