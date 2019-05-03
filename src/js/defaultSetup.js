function firstTimeLoadLocalStorage() {
  if (
    localStorage.getItem("todo") === "null" ||
    localStorage.getItem("todo") === null
  ) {
    todo = [];
    createList("Default List");
    createElement(
      0,
      "open",
      "This is an item that is yet to be completed",
      "This is the description for the item that is yet to be completed"
    );
    createListsAndElements();
    createElement(
      0,
      "closed",
      "This is an item that has been completed",
      "This is the description for the item that has been completed"
    );
    createListsAndElements();
  } else {
    createListsAndElements();
  }
}
firstTimeLoadLocalStorage();
