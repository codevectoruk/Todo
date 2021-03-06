var version = 213; //update this to reflect the latest version of the todo
var devStatus = "production"; //use production or development for the status of the build
var todo = JSON.parse(localStorage.getItem("todo"));
var elementCreateFlag = false;

autosize($("#elementDescription"));
autosize($("#elementComments"));

$("#elementDescription").focus(function() {
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
});

function updateStoredTodoList() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

//@prepros-append defaultSetup.js
//@prepros-append manageElementsAndLists.js
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
//@prepros-append textareaUserSaveAlert.js
//@prepros-append bringUpToLatestVersion.js
//@prepros-append markdown.js
//@prepros-append clickEvents.js
//@prepros-append dragDrop.js
//@prepros-append notifications.js
//@prepros-append footer.js
