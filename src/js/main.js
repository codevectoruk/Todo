var todo = JSON.parse(localStorage.getItem("todo"));
createListsAndElements();
autosize($("textarea"));

//@prepros-append defaultSetup.js
//@prepros-append manageElementsAndLists.js
//@prepros-append findElementsAndLists.js
//@prepros-append dropdownDeleteAndRenameLists.js
//@prepros-append elementModal.js
//@prepros-append confirmModal.js

function updateStoredTodoList() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
