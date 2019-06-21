function checkVersion() {
  if (
    localStorage.getItem("version") === "null" ||
    localStorage.getItem("version") === null ||
    version < localStorage.getItem("version") ||
    devStatus === "development"
  ) {
    updateVersion();
  }
}

function updateVersion() {
  $.each(todo, function(listId, listFields) {
    //iterate through the lists
    repairList(listFields);
    $.each(listFields.openElements, function(elementId, elementFields) {
      var listStatus = "open";
      repairElement(listId, elementId, elementFields, listStatus);
      listStatus = "closed";
      repairElement(listId, elementId, elementFields, listStatus);
      listStatus = "deleted";
      repairElement(listId, elementId, elementFields, listStatus);
      createListsAndElements();
      localStorage.setItem("version", version);
    });
  });
}

function repairElement(listId, elementId, elementFields, listStatus) {
  if (elementFields.category === undefined) {
    setElementCategory(listId, elementId, listStatus, 0);
  }
  if (elementFields.checklist === undefined) {
    setElementChecklist(listId, elementId, listStatus, []);
  }
  if (elementFields.classification === undefined) {
    setElementClassification(listId, elementId, listStatus, "");
  }
  if (elementFields.comments === undefined) {
    setElementComments(listId, elementId, listStatus, "");
  }
  if (elementFields.created === undefined) {
    var d = new Date().toISOString();
    setElementCreated(listId, elementId, listStatus, d);
  }
  if (elementFields.description === undefined) {
    setElementDescription(listId, elementId, listStatus, "");
  }
  if (elementFields.due === undefined) {
    setElementDue(listId, elementId, listStatus, "");
  }
  if (elementFields.title === undefined) {
    setElementTitle(listId, elementId, listStatus, "Default Title");
  }
  if (elementFields.user === undefined) {
    setElementUser(listId, elementId, listStatus, "");
  }
}

function repairList(listFields) {
  //repair name
  if (listFields.list_name === undefined) {
    listFields.list_name = "Default List";
  }
  //repair openElements
  if (listFields.openElements === undefined) {
    listFields.openElements = [];
  }
  //repair closedElements
  if (listFields.closedElements === undefined) {
    listFields.closedElements = [];
  }
  //repair deletedElements
  if (listFields.deletedElements === undefined) {
    listFields.deletedElements = [];
  }
}

checkVersion();

// "list_name": "Default List",
// "openElements": [],
// "closedElements": [],
// "deletedElements": []

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
