function firstTimeLoadLocalStorage() {
  if (
    localStorage.getItem("todo") === "null" ||
    localStorage.getItem("todo") === null
  ) {
    todo = [];
    // createList("Default List");
    // createElement(
    //   0,
    //   "open",
    //   "This is an item that is yet to be completed",
    //   "This is the description for the item that is yet to be completed"
    // );
    // createListsAndElements();
    // createElement(
    //   0,
    //   "closed",
    //   "This is an item that has been completed",
    //   "This is the description for the item that has been completed"
    // );

    createList("List 1");
    createList("List 2");
    createElement(0, "open", "TestElement01");
    createElement(0, "open", "TestElement02");
    createElement(0, "open", "TestElement03");
    createElement(0, "open", "TestElement04");
    createElement(0, "open", "TestElement05");
    createElement(0, "closed", "TestElement06");
    createElement(0, "closed", "TestElement07");
    createElement(0, "closed", "TestElement08");
    createElement(0, "closed", "TestElement09");
    createElement(0, "closed", "TestElement010");
    createElement(1, "open", "TestElement11");
    createElement(1, "open", "TestElement12");
    createElement(1, "open", "TestElement13");
    createElement(1, "open", "TestElement14");
    createElement(1, "open", "TestElement15");
    createElement(1, "closed", "TestElement16");
    createElement(1, "closed", "TestElement17");
    createElement(1, "closed", "TestElement18");
    createElement(1, "closed", "TestElement19");
    createElement(1, "closed", "TestElement110");

    createListsAndElements();
  } else {
    createListsAndElements();
  }
}
firstTimeLoadLocalStorage();
