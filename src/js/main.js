//@prepros-prepend defaultSetup.js

var todo = JSON.parse(localStorage.getItem("todo"));

createListsAndElements();

var ta = document.querySelector('textarea');
ta.addEventListener('focus', function(){
  autosize(ta);
});
// autosize($("textarea"));

function updateStoredTodoList() {
    localStorage.setItem("todo", JSON.stringify(todo));
}


//@prepros-append defaultSetup.js
//@prepros-append manageElementsAndLists.js
//@prepros-append findElementsAndLists.js
//@prepros-append dropdownDeleteAndRenameLists.js
//@prepros-append elementModal.js
//@prepros-append confirmModal.js
//@prepros-append autoUpdate.js
//@prepros-append themeChanger.js
//@prepros-append serviceWorker.js
//@prepros-append importAndExportJson.js
//@prepros-append userAlerts.js
