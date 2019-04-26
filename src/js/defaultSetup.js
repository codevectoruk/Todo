var todoListExample = [{
  "list_name": "Default List",
  "openElements": [{
    "title": "This is an item that is yet to be completed",
    "description": "This is the description for the item that is yet to be completed",
    "comments": "",
    "category": 0,
    "classification": "",
    "user": "",
    "due": "",
    "created": "",
    "checklist": [{
      "name": "checklist Item 1",
      "status": "unchecked"
    }]
  }],
  "closedElements": [{
    "title": "This is an item that has been completed",
    "description": "This is the description for the item that has been completed",
    "comments": "",
    "category": 0,
    "classification": "",
    "user": "",
    "due": "",
    "created": "",
    "checklist": [{
      "name": "checklist Item 1",
      "status": "unchecked"
    }]
  }],
  "deletedElements": []
}];


function firstTimeLoadLocalStorage() {
  if (localStorage.getItem("todo") === null) {
    localStorage.setItem("todo", JSON.stringify(todoListExample));
    todo = JSON.parse(localStorage.getItem("todo"));
  }
}
firstTimeLoadLocalStorage();
