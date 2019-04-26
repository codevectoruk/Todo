//@prepros-prepend defaultSetup.js

var todo = JSON.parse(localStorage.getItem("todo"));

createListsAndElements();

autosize($("#modal-description"));

$("#modal-description").focus(function() {
  autosize.update($("#modal-description"));
});

function updateStoredTodoList() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

//@prepros-append defaultSetup.js
//@prepros-append manageElementsAndLists.js
//@prepros-append findElementsAndLists.js
//@prepros-append modalPrepare.js
//@prepros-append modalToggleVisibility.js
//@prepros-append button.js
//@prepros-append autoUpdate.js
//@prepros-append themeChanger.js
//@prepros-append serviceWorker.js
//@prepros-append importAndExportJson.js
//@prepros-append userAlerts.js
//@prepros-append dateDropdown.js
//@prepros-append timeTill.js
//@prepros-append jsonApi.js
