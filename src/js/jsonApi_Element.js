function getElementList(localListId, localStatus) {
  var returnState;
  if (localStatus == "open") {
    returnState = todo[localListId].openElements;
  } else if (localStatus == "closed") {
    returnState = todo[localListId].closedElements;
  } else if (localStatus == "deleted") {
    returnState = todo[localListId].deletedElements;
  }
  return returnState;
}

function createElement(
  localListId,
  localElementStatus,
  localElementTitle,
  localElementDescription,
  localElementComments,
  localElementsCategory,
  localElementClassification,
  localElementUser,
  localElementDue,
  localElementCreated,
  localElementChecklist
) {
  var returnState = false;
  if (localElementTitle) {
    //check that the title is present
    localElementDescription = localElementDescription || "";
    localElementComments = localElementComments || "";
    localElementsCategory = localElementsCategory || 0;
    localElementClassification = localElementClassification || "";
    localElementUser = localElementUser || "";
    localElementDue = localElementDue || "";
    var d = new Date().toISOString();
    localElementCreated = localElementCreated || d;
    localElementChecklist = localElementChecklist || [];
    if (createJsonElement(localListId, localElementStatus)) {
      // create the skeleton element in the list
      var localElementId;
      if (localElementStatus == "open") {
        localElementId = todo[localListId].openElements.length - 1;
      } else if (localElementStatus == "closed") {
        localElementId = todo[localListId].closedElements.length - 1;
      } else if (localElementStatus == "deleted") {
        localElementId = todo[localListId].deletedElements.length - 1;
      }
      setElementTitle(
        localListId,
        localElementId,
        localElementStatus,
        localElementTitle
      );
      setElementDescription(
        localListId,
        localElementId,
        localElementStatus,
        localElementDescription
      );
      setElementComments(
        localListId,
        localElementId,
        localElementStatus,
        localElementComments
      );
      setElementCategory(
        localListId,
        localElementId,
        localElementStatus,
        localElementsCategory
      );
      setElementClassification(
        localListId,
        localElementId,
        localElementStatus,
        localElementClassification
      );
      setElementUser(
        localListId,
        localElementId,
        localElementStatus,
        localElementUser
      );
      setElementDue(
        localListId,
        localElementId,
        localElementStatus,
        localElementDue
      );
      setElementCreated(
        localListId,
        localElementId,
        localElementStatus,
        localElementCreated
      );
      setElementChecklist(
        localListId,
        localElementId,
        localElementStatus,
        localElementChecklist
      );
    }
  }
  return returnState;
}

function createJsonElement(localListId, localElementStatus) {
  var returnState = false;
  var localList = getElementList(localListId, localElementStatus);
  localList.push({
    title: "",
    description: "",
    classification: "",
    user: "",
    due: "",
    created: "",
    checklist: []
  });
  returnState = true;
  return returnState;
}

function getElement(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId];
}

function getElementTitle(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].title;
}

function getElementDescription(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].description;
}

function getElementComments(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].comments;
}

function getElementCategory(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].category;
}

function getElementClassification(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].classification;
}

function getElementUser(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].user;
}

function getElementDue(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].due;
}

function getElementCreated(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].created;
}

function getElementChecklist(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].checklist;
}

function setElementTitle(
  localListId,
  localElementId,
  localElementStatus,
  localElementTitle
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].title = localElementTitle;
}
function setElementDescription(
  localListId,
  localElementId,
  localElementStatus,
  localElementDescription
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].description = localElementDescription;
}
function setElementComments(
  localListId,
  localElementId,
  localElementStatus,
  localElementComments
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].comments = localElementComments;
}
function setElementCategory(
  localListId,
  localElementId,
  localElementStatus,
  localElementsCategory
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].category = parseInt(localElementsCategory);
}
function setElementClassification(
  localListId,
  localElementId,
  localElementStatus,
  localElementClassification
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].classification = localElementClassification;
}
function setElementUser(
  localListId,
  localElementId,
  localElementStatus,
  localElementUser
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].user = localElementUser;
}
function setElementDue(
  localListId,
  localElementId,
  localElementStatus,
  localElementDue
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].due = localElementDue;
}
function setElementCreated(
  localListId,
  localElementId,
  localElementStatus,
  localElementCreated
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].created = localElementCreated;
}
function setElementChecklist(
  localListId,
  localElementId,
  localElementStatus,
  localElementChecklist
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].checklist = localElementChecklist;
}

function changeElementStatus(localListId, localElementId, toStatus) {
  var localListOpenElements = getElementList(localListId, "open");
  var localListClosedElements = getElementList(localListId, "closed");
  var localListDeletedElements = getElementList(localListId, "deleted");
  var localElement;
  var remList;
  var addList;
  if (toStatus === "open") {
    addList = localListOpenElements;
    remList = localListClosedElements;
  }
  if (toStatus === "closed") {
    addList = localListClosedElements;
    remList = localListOpenElements;
  }
  if (toStatus === "deleted") {
    addList = localListDeletedElements;
    remList = localListClosedElements;
  }
  if (remList !== undefined) {
    localElement = remList[localElementId];
    remList.splice(localElementId, 1);
    addList.push(localElement);
  }
}

function changeElementStatusToDeleted(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "deleted");
}

function changeElementStatusToClosed(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "closed");
}

function changeElementStatusToOpen(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "open");
}

function deleteElement(localListId, localElementId, localElementStatus) {
  var localListOpenElements = getElementList(localListId, "open");
  var localListClosedElements = getElementList(localListId, "closed");
  var localListDeletedElements = getElementList(localListId, "deleted");
  var remList;
  if (localElementStatus === "open") {
    remList = localListOpenElements;
  }
  if (localElementStatus === "closed") {
    remList = localListClosedElements;
  }
  if (localElementStatus === "deleted") {
    remList = localListDeletedElements;
  }
  if (remList !== undefined) {
    remList.splice(localElementId, 1);
  }
}

// function changeElementCategory() {
//
// }

function reorderList(localListId, localElementId, direction) {
  $.each(todo, function(listId, listFields) {
    // if the searched for list matches one in the list
    if (listId === parseInt(localListId)) {
      //var localElements = listFields.elements;
      if (
        direction === "up" &&
        localElementId !== 0 &&
        listFields.openElements.length > 1
      ) {
        var selectedElementUp = listFields.openElements[localElementId];
        var swapElementUp = listFields.openElements[localElementId - 1];

        listFields.openElements[localElementId] = swapElementUp;
        listFields.openElements[localElementId - 1] = selectedElementUp;
      }
      if (
        direction === "down" &&
        localElementId !== listFields.openElements.length - 1 &&
        listFields.openElements.length > 1
      ) {
        var selectedElementDown = listFields.openElements[localElementId];
        var swapElementDown = listFields.openElements[localElementId + 1];

        listFields.openElements[localElementId] = swapElementDown;
        listFields.openElements[localElementId + 1] = selectedElementDown;
      }
    }
  });
  createListsAndElements();
}
// {
//   "title": "This is an item that is yet to be completed",
//   "description": "This is the description for the item that is yet to be completed",
//   "comments": "",
//   "category": 0,
//   "classification": "",
//   "user": "",
//   "due": "",
//   "created": "",
//   "checklist": [{
//     "name": "checklist Item 1",
//     "status": "unchecked"
//   }]
// }
