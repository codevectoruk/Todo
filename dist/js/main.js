"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var todo = JSON.parse(localStorage.getItem("todo"));
var elementCreateFlag = false;

autosize($("#elementDescription"));
autosize($("#elementComments"));

$("#elementDescription").focus(function () {
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

function firstTimeLoadLocalStorage() {
  if (localStorage.getItem("todo") === "null" || localStorage.getItem("todo") === null) {
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

function createListsAndElements() {
  updateStoredTodoList(); //updated the local storage list with the one that is currently stored in the variable
  $(".list-container").empty(); //empty the list container
  $.each(todo, function (listId, listFields) {
    //iterate through the lists
    var output = populateListFromJson(listId, listFields); //use the populateListFromJson function to create the html that goes into the list-container class
    $(".list-container").append(output); //append the output from populateListFromJson to the list-container class that is part of index.html
    output = "";
    $.each(listFields.openElements, function (elementId, elementFields) {
      //iterate through the openElements part of the current list that is being iterated through
      output += populateElementsFromJson(listId, elementId, elementFields, "open");
    });
    $.each(listFields.closedElements, function (elementId, elementFields) {
      //iterate through the closedElements part of the current list that is being iterated through
      output += populateElementsFromJson(listId, elementId, elementFields, "closed");
    });
    $("#list-" + listId).append(output); //append all of the elements to the list-container
    // $("#list-" + listId).append(populateListElementPlaceholder());
  });
  $(".list-container").append(populateAddAnotherList()); //append the "create another item" button to the list-container
  registerDropdownClickInterrupts();
}

function populateListFromJson(localListId, localListFields) {
  var returnState = "<div class='list' ondrop='listOnDropEvent(event, " + localListId + ")' ondragover='allowDrop(event)'><div class='list-header'>" + "<div class='list-title'>" + localListFields.list_name + "</div><div class='button-container'><div class='list-button' " + "onclick='toggleDropdown(" + localListId + ")'><i class='fas fa-ellipsis-h'></i></div><div " + "class='dropdown hidden' id='id-dropdown-" + localListId + "'><div class='dropdown-title'><div " + "class='dropdown-title-text'>List Actions</div><i " + "class='fas fa-times' onclick='toggleDropdown(" + localListId + ")'></i></div><div class='dropdown-element' " + "onclick='prepareModalRenameList(" + localListId + ")'>Rename List</div><div class='dropdown-element' " + "onclick='prepareModalDeleteList(" + localListId + ")'>Delete List</div></div></div></div><div class='list-body scrollbar-alt' " + "id='list-" + localListId + "'></div><div class='list-footer' onclick='buttonOpenElementModalForElementCreate(" + localListId + ")'><i class='fas fa-plus'></i> Add another item</div></div>";
  return returnState;
}

function populateElementsFromJson(localListId, localElementId, localElementFields, localElementStatus) {
  var returnState = "";
  var statusStringA = "";
  var statusStringB = "";
  var statusStringC = "";
  var statusStringD = "";
  var dueDateTag = "";
  var idStatusCode = 0;
  var categoryTag = populateCategoryField(localElementFields.category);
  if (localElementFields.due != "" && localElementStatus == "open") {
    dueDateTag = "<div class='tag tag-" + calculateRisk(localElementFields.due) + "'>" + timeTill(localElementFields.due) + "</div>";
  }
  if (localElementStatus === "open") {
    statusStringA = "status-open";
    statusStringB = "buttonChangeElementStatusToClosed";
    statusStringC = "far fa-square";
    statusStringD = "open";
    idStatusCode = 0;
  }
  if (localElementStatus === "closed") {
    statusStringA = "status-closed";
    statusStringB = "buttonChangeElementStatusToOpen";
    statusStringC = "fas fa-check-square";
    statusStringD = "closed";
    idStatusCode = 1;
  }
  returnState = "<div class='list-element " + statusStringA + "' id=\"" + localListId + "-" + localElementId + "-" + idStatusCode + '"' + " draggable='true' ondragend='elementDragEnd(event)' ondrop='elementonDropEvent(event," + localListId + ", " + localElementId + ', "' + localElementStatus + "\")' ondragover='onElementDragOver(event," + localListId + ", " + localElementId + ', "' + localElementStatus + "\")' ondragstart='elementOnDragStartEvent(event," + localListId + ", " + localElementId + ', "' + localElementStatus + "\")'>" + categoryTag + "<div class='status' onclick='" + statusStringB + "(" + localListId + ", " + localElementId + ")'><i class=\"" + statusStringC + "\"></i></div><div class='title' onclick='buttonOpenElementModalForElementUpdate(" + localListId + ", " + localElementId + ', "' + statusStringD + "\")'>" + localElementFields.title + dueDateTag + "</div><div class='position'>";
  if (localElementStatus === "closed") {
    returnState += "<div class='promote' onclick='prepareModalDelete(" + localListId + ", " + localElementId + ')\'><i class="far fa-trash-alt"></i></div></div>';
  }
  returnState += "</div></div>";
  return returnState;
}

function populateListElementPlaceholder() {
  var output = '<div ondragover="onPlaceholderDragOver()" class="list-element-placeholder"></div>';
  return output;
}

function populateListElementDrop(localListId, localElementId, localElementStatus) {
  var output = "<div class='list-element-drop' ondrop='elementonDropEvent(event," + localListId + "," + localElementId + ', "' + localElementStatus + "\")'></div>";
  return output;
}

function populateAddAnotherList() {
  //contains the divs for the "Add another item" for the list-container
  var output = '<div class="add-list" ' + 'onclick="buttonCreateList()"><i class="fas fa-plus"></i> ' + "Add another item</div>";
  return output;
}

function populateCategoryField(localElementFieldsCategory) {
  var output = "";
  if (localElementFieldsCategory == 0) {
    output = "<div class='category'></div>";
  } else if (localElementFieldsCategory == 1) {
    output = "<div class='category category-blue'></div>";
  } else if (localElementFieldsCategory == 2) {
    output = "<div class='category category-green'></div>";
  } else if (localElementFieldsCategory == 3) {
    output = "<div class='category category-orange'></div>";
  } else if (localElementFieldsCategory == 4) {
    output = "<div class='category category-purple'></div>";
  } else if (localElementFieldsCategory == 5) {
    output = "<div class='category category-red'></div>";
  } else if (localElementFieldsCategory == 6) {
    output = "<div class='category category-yellow'></div>";
  }
  return output;
}

//opens the modal in the create configuration
function prepareModalDelete(localListId, localElementId) {
  $("#modal-confirm-list").val(localListId);
  $("#modal-confirm-element").val(localElementId);
  $("#deleteElementButton").show();
  $("#deleteListButton").hide();
  closeAllDropdown();
  toggleConfirmationModalVisibility();
}

function prepareModalDeleteList(localListId) {
  $("#modal-confirm-list").val(localListId);
  $("#deleteElementButton").hide();
  $("#deleteListButton").show();
  closeAllDropdown();
  toggleConfirmationModalVisibility();
}

function prepareModalRenameList(listId) {
  $("#modal-rename-list").val(listId);
  $("#modal-list-rename-input").val(todo[listId].list_name);
  closeAllDropdown();
  toggleRenameListModal();
  $("#modal-list-rename-input").focus();
}

//toggles the confirmation modal visibility
function toggleConfirmationModalVisibility() {
  if ($("#id-confirmation-modal").hasClass("hidden")) {
    $("#id-confirmation-modal").addClass("flex");
    $("#id-confirmation-modal").removeClass("hidden");
  } else {
    $("#id-confirmation-modal").removeClass("flex");
    $("#id-confirmation-modal").addClass("hidden");
  }
}

//toggles the element modal visibility
function toggleElementModalVisibility() {
  if ($("#id-element-modal").hasClass("hidden")) {
    $("#id-element-modal").addClass("flex");
    $("#id-element-modal").removeClass("hidden");
  } else {
    $("#id-element-modal").removeClass("flex");
    $("#id-element-modal").addClass("hidden");
    elementCreateFlag = false;

    $("#elementDescription").removeClass("flex");
    $("#elementDescription").addClass("hidden");
    $("#elementComments").removeClass("flex");
    $("#elementComments").addClass("hidden");

    $("#elementDescriptionMarkdownContainer").addClass("flex");
    $("#elementDescriptionMarkdownContainer").removeClass("hidden");
    $("#elementCommentsMarkdownContainer").addClass("flex");
    $("#elementCommentsMarkdownContainer").removeClass("hidden");
  }
}

function closeAllModals() {
  $(".modal-container").removeClass("flex");
  $(".modal-container").addClass("hidden");
}

function closeAllDropdown() {
  $(".dropdown").removeClass("flex");
  $(".dropdown").addClass("hidden");
}

function toggleRenameListModal() {
  if ($("#id-rename-modal").hasClass("hidden")) {
    $("#id-rename-modal").addClass("flex");
    $("#id-rename-modal").removeClass("hidden");
  } else {
    $("#id-rename-modal").removeClass("flex");
    $("#id-rename-modal").addClass("hidden");
  }
}

function toggleDropdown(buttonId) {
  if ($("#id-dropdown-" + buttonId).hasClass("hidden")) {
    // hide all other dropdowns
    closeAllDropdown();
    //show this dropdown
    $("#id-dropdown-" + buttonId).removeClass("hidden");
    $("#id-dropdown-" + buttonId).addClass("flex");
  } else {
    //hide this dropdown
    $("#id-dropdown-" + buttonId).removeClass("flex");
    $("#id-dropdown-" + buttonId).addClass("hidden");
  }
}

// function buttonIncreaseElementPosition(localListId, localElementId) {
//   reorderList(localListId, localElementId, "up");
// }

// function buttonDecreaseElementPosition(localListId, localElementId) {
//   reorderList(localListId, localElementId, "down");
// }

function buttonChangeElementStatusToOpen(listId, localElementId) {
  changeElementStatusToOpen(listId, localElementId);
  createListsAndElements();
}

function buttonChangeElementStatusToClosed(listId, localElementId) {
  changeElementStatusToClosed(listId, localElementId);
  createListsAndElements();
}

function buttonChangeElementStatusToDeleted() {
  var localListId = $("#modal-confirm-list").val();
  var localElementId = $("#modal-confirm-element").val();
  changeElementStatusToDeleted(localListId, localElementId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List item successfully deleted.", "success", 5000);
}

function buttonCreateList() {
  createList("New List");
  createListsAndElements();
}

function buttonDeleteList() {
  var localListId = $("#modal-confirm-list").val();
  deleteList(localListId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List successfully deleted.", "success", 5000);
}

//opens the modal in the update configuration
// buttonOpenElementModalForElementUpdate
// prepareModalUpdate
function buttonOpenElementModalForElementUpdate(localListId, localElementId, localElementStatus) {
  var localElement = getElement(localListId, localElementId, localElementStatus);
  resetElementModalUserAlert();
  $("#modal-list").val(localListId);
  $("#modal-element").val(localElementId);
  $("#modal-status").val(localElementStatus);
  $("#elementTitle").val(localElement.title);
  $("#elementDescription").val(localElement.description);
  setMarkdownDescription(localElement.description);
  $("#elementComments").val(localElement.comments);
  setMarkdownComments(localElement.comments);
  $("#elementCategory").val(parseInt(localElement.category));
  //$("#elementClassification").val(localElement.classification);
  //$("#elementUser").val(localElement.user);
  $("#elementDue").val(localElement.due);
  // $("#elementCreated").val(localElement.created);
  // $("#elementCategory").val(localElement.category);
  $("#element-modal-button-create").hide();
  $("#element-modal-button-update").show();
  $("#element-modal-update-title").show();
  $("#element-modal-create-title").hide();
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
  $("#elementTitle").focus();
}

//opens the modal in the create configuration
//prepareModalCreate
//buttonOpenElementModalForElementCreate
function buttonOpenElementModalForElementCreate(listId) {
  elementCreateFlag = true;
  resetElementModalUserAlert();
  $("#elementTitle").val("");
  $("#elementDescription").val("");
  setMarkdownDescription("");
  $("#elementComments").val("");
  setMarkdownComments("");
  $("#elementCategory").val(0);
  //$("#elementClassification").val("");
  //$("#elementUser").val("");
  $("#elementDue").val("");
  // $("#elementCreated").val("");
  // $("#elementCategory").val("");
  $("#element-modal-button-create").show();
  $("#element-modal-button-update").hide();
  $("#element-modal-update-title").hide();
  $("#element-modal-create-title").show();
  $("#modal-list").val(listId);
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
  $("#elementTitle").focus();
}

//button controls
// update button
function buttonUpdateElement() {
  var localListId = $("#modal-list").val();
  var localElementId = $("#modal-element").val();
  var localElementStatus = $("#modal-status").val();
  setElementTitle(localListId, localElementId, localElementStatus, $("#elementTitle").val());
  setElementDescription(localListId, localElementId, localElementStatus, $("#elementDescription").val());
  setElementComments(localListId, localElementId, localElementStatus, $("#elementComments").val());
  setElementCategory(localListId, localElementId, localElementStatus, parseInt($("#elementCategory").val()));
  // setElementClassification(localListId, localElementId, localElementStatus, $("#elementClassification").val());
  // setElementUser(localListId, localElementId, localElementStatus, $("#elementUser").val());
  setElementDue(localListId, localElementId, localElementStatus, $("#elementDue").val());
  // setElementCreated(localListId, localElementId, localElementStatus, $("#elementCreated").val());
  // setElementChecklist(localListId, localElementId, localElementStatus, $("#elementChecklist").val());
  toggleElementModalVisibility();
  createListsAndElements();
}

function buttonCreateNewElement() {
  var localListId = $("#modal-list").val();
  var localElementState = "open";
  var localElementTitle = $("#elementTitle").val();
  var localElementDescription = $("#elementDescription").val();
  var localElementComments = $("#elementComments").val();
  var localElementsCategory = parseInt($("#elementCategory").val());
  var localElementClassification = "";
  var localElementUser = "";
  var localElementDue = $("#elementDue").val();
  var localElementCreated = "";
  var localElementChecklist = "";
  createElement(localListId, localElementState, localElementTitle, localElementDescription, localElementComments, localElementsCategory, localElementClassification, localElementUser, localElementDue, localElementCreated, localElementChecklist);
  toggleElementModalVisibility();
  createListsAndElements();
  elementCreateFlag = false;
}

function buttonRenameList() {
  var localListId = $("#modal-rename-list").val();
  var localListName = $("#modal-list-rename-input").val();
  setListName(localListId, localListName);
  toggleRenameListModal();
  closeAllDropdown();
  createListsAndElements();
}

function buttonClearDueDate() {
  $("#elementDue").val("");
}

function autoUpdate() {
  var localTodo = JSON.parse(localStorage.getItem("todo"));
  if (localStorage.getItem("todo") != null) {
    if (!compareJsonArrays(todo, localTodo)) {
      todo = JSON.parse(localStorage.getItem("todo"));
      createListsAndElements();
      generateUserAlert("It looks like you updated your list on another tab, it has been updated on this tab too!", "information", 5000);
    }
  } else {
    firstTimeLoadLocalStorage();
    createListsAndElements();
  }
}

function compareJsonArrays(x, y) {
  if (x === y) {
    return true;
  }
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  var p;
  for (p in x) {
    if (x.hasOwnProperty(p)) {
      if (!y.hasOwnProperty(p)) {
        return false;
      }
      if (x[p] === y[p]) {
        continue;
      }
      if (_typeof(x[p]) !== "object") {
        return false;
      }
      if (!compareJsonArrays(x[p], y[p])) {
        return false;
      }
    }
  }

  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
}

// every 5 seconds second check for the list being updated on another tab
window.setInterval(function () {
  autoUpdate();
}, 5000);

// auto update the lists and elements one a minute
window.setInterval(function () {
  createListsAndElements();
}, 60000);

window.setInterval(function () {
  if ($(".list-container").get(0).scrollWidth > $(".list-container").get(0).clientWidth) {
    $(".footer-container").addClass("hidden");
    $(".footer-container").removeClass("flex");
  } else {
    $(".footer-container").removeClass("hidden");
    $(".footer-container").addClass("flex");
  }
}, 500);

var currentTheme = "";

function themeChanger(theme) {
  if (theme === "default") {
    currentTheme = "default";
    $("body").removeClass();
    $("body").addClass("theme-default");
  }
  if (theme === "dark") {
    currentTheme = "dark";
    $("body").removeClass();
    $("body").addClass("theme-dark");
  }
  if (theme === "light") {
    currentTheme = "light";
    $("body").removeClass();
    $("body").addClass("theme-light");
  }
  saveTheme(theme);
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

function loadTheme() {
  themeChanger(localStorage.getItem("theme"));
}

function autoChangeTheme() {
  if (localStorage.getItem("theme") != null) {
    if (localStorage.getItem("theme") !== currentTheme) {
      loadTheme();
      generateUserAlert("It looks like you updated your theme on another tab, it has been updated on this tab too!", "information", 5000);
    }
  } else {
    setDefaultTheme();
  }
}

function setDefaultTheme() {
  if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "default");
  }
}

setDefaultTheme();
loadTheme();

//check every 5 seconds for the theme being changed on another tab
window.setInterval(function () {
  autoChangeTheme();
}, 5000);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js", {
    scope: "./"
  });
}

function downloadObjectAsJson() {
  var exportObj = todo;
  var today = new Date();
  var exportName = "todoBackup_" + today.toISOString();
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function generateUserAlert(inputBody, inputAlertType, lifespan) {
  var icon = "";
  var title = "";
  var alertClass = "";
  var body = inputBody;
  var output = "";
  var min = 0;
  var max = 1000000;
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  if (inputAlertType == "information") {
    icon = "fas fa-info-circle";
    title = "Information";
    alertClass = "userAlert-info";
  }
  if (inputAlertType == "success") {
    icon = "fas fa-check-circle";
    title = "Success";
    alertClass = "userAlert-success";
  }
  if (inputAlertType == "warning") {
    icon = "fas fa-exclamation-circle";
    title = "Warning";
    alertClass = "userAlert-warning";
  }
  if (inputAlertType == "error") {
    icon = "fas fa-times-circle";
    title = "Error";
    alertClass = "userAlert-error";
  }
  output = "<div class='userAlert " + alertClass + "'id='alertId-" + random + "'><div class='icon'><i class='" + icon + "'></i></div><div class='text'><div class='text-title'>" + title + "</div><div class='text-body'>" + body + "</div></div></div>";
  $(".userAlert-container").append(output);

  //var myVar = setTimeout(deleteUserAlert(random), 3000);
  if (lifespan !== 0) {
    setTimeout(function () {
      $("#alertId-" + random).fadeOut(2000, function () {
        $("#alertId-" + random).remove();
      });
    }, lifespan);
  }
}

//user alert demo messages
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "information", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "success", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "warning", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "error", 0);

tail.DateTime(".tail-datetime-field", {
  animate: true,
  classNames: false,
  closeButton: true, // New in 0.4.5
  dateFormat: "YYYY-mm-dd",
  dateStart: false,
  dateRanges: [],
  dateBlacklist: true,
  dateEnd: false,
  locale: "en",
  position: "bottom",
  rtl: "auto",
  startOpen: false,
  stayOpen: false,
  timeFormat: "HH:ii:ss",
  timeHours: null, // New Syntax in 0.4.5
  timeMinutes: null, // New Syntax in 0.4.5
  timeSeconds: 0, // New Syntax in 0.4.5
  timeIncrement: true, // New in 0.4.5
  timeStepHours: 1, // New in 0.4.3
  timeStepMinutes: 5, // New in 0.4.3
  timeStepSeconds: 5, // New in 0.4.3
  today: true,
  tooltips: [],
  viewDefault: "days",
  viewDecades: false,
  viewYears: true,
  viewMonths: true,
  viewDays: true,
  weekStart: 1
});

function timeTill(futureDate) {
  var dateFuture = Date.parse(futureDate);
  var dateNow = new Date();

  var seconds = Math.floor((dateFuture - dateNow) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  var output = "";
  if (dateFuture - dateNow <= 0) {
    output = "Overdue";
  } else {
    if (days >= 1) {
      if (days == 1) {
        output = days + " Day";
      } else {
        output = days + " Days";
      }
    } else {
      if (hours >= 1) {
        if (hours == 1) {
          output = hours + " Hour";
        } else {
          output = hours + " Hours";
        }
      } else {
        if (minutes == 1) {
          output = minutes + " Min";
        } else {
          output = minutes + " Mins";
        }
      }
    }
  }
  return output;
}

function calculateRisk(futureDate) {
  var dateFuture = Date.parse(futureDate);
  var dateNow = new Date();
  var danger = 1000 * 60 * 60 * 24; // 24 hours in ms
  var warning = danger * 7; // 1 week in ms

  var returnState = "";
  var diff = dateFuture - dateNow;
  if (diff < danger) {
    returnState = "danger";
  } else {
    if (diff < warning) {
      returnState = "warning";
    } else {
      returnState = "info";
    }
  }
  return returnState;
}

//@prepros-append jsonApi_List.js
//@prepros-append jsonApi_Element.js

function createList(localListName, localOpenElements, localClosedElements, localDeletedElements) {
  localOpenElements = localOpenElements || "";
  localClosedElements = localClosedElements || "";
  localDeletedElements = localDeletedElements || "";
  var returnState = false;
  if (createJsonList()) {
    //create the barebone json list
    var locaListId = todo.length - 1;
    setListName(locaListId, localListName); //as the list will be added on the end it's id will be length - 1
    if (localOpenElements != "") {
      setListOpenElements(locaListId, localOpenElements);
    }
    if (localClosedElements != "") {
      setListClosedElements(locaListId, localClosedElements);
    }
    if (localDeletedElements != "") {
      setListDeletedElements(locaListId, localDeletedElements);
    }
    returnState = true;
  }
  return returnState;
}

function createJsonList() {
  var returnState = false;
  todo.push({
    list_name: "",
    openElements: [],
    closedElements: [],
    deletedElements: []
  });
  returnState = true;
  return returnState;
}

function deleteList(localListId) {
  var returnState = false;
  try {
    todo.splice(localListId, 1);
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

function getList(localListId) {
  return todo[localListId];
}

function getListName(localListId) {
  return todo[localListId].list_name;
}

function getListOpenElements(localListId) {
  return todo[localListId].openElements;
}

function getListClosedElements(localListId) {
  return todo[localListId].closedElements;
}

function getListDeletedElements(localListId) {
  return todo[localListId].deletedElements;
}

function setListName(localListId, localListName) {
  var returnState = false;
  try {
    todo[localListId].list_name = localListName;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

function setListOpenElements(localListId, localListOpenElements) {
  var returnState = false;
  try {
    todo[localListId].openElements = localListOpenElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

function setListClosedElements(localListId, localListClosedElements) {
  var returnState = false;
  try {
    todo[localListId].closedElements = localListClosedElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

function setListDeletedElements(localListId, localListDeletedElements) {
  var returnState = false;
  try {
    todo[localListId].deletedElements = localListDeletedElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

// "list_name": "Default List",
// "openElements": [],
// "closedElements": [],
// "deletedElements": []

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

function createElement(localListId, localElementStatus, localElementTitle, localElementDescription, localElementComments, localElementsCategory, localElementClassification, localElementUser, localElementDue, localElementCreated, localElementChecklist) {
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
      setElementTitle(localListId, localElementId, localElementStatus, localElementTitle);
      setElementDescription(localListId, localElementId, localElementStatus, localElementDescription);
      setElementComments(localListId, localElementId, localElementStatus, localElementComments);
      setElementCategory(localListId, localElementId, localElementStatus, localElementsCategory);
      setElementClassification(localListId, localElementId, localElementStatus, localElementClassification);
      setElementUser(localListId, localElementId, localElementStatus, localElementUser);
      setElementDue(localListId, localElementId, localElementStatus, localElementDue);
      setElementCreated(localListId, localElementId, localElementStatus, localElementCreated);
      setElementChecklist(localListId, localElementId, localElementStatus, localElementChecklist);
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

function getElementDescription(localListId, localElementId, localElementStatus) {
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

function getElementClassification(localListId, localElementId, localElementStatus) {
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

function setElementTitle(localListId, localElementId, localElementStatus, localElementTitle) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].title = localElementTitle;
}
function setElementDescription(localListId, localElementId, localElementStatus, localElementDescription) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].description = localElementDescription;
}
function setElementComments(localListId, localElementId, localElementStatus, localElementComments) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].comments = localElementComments;
}
function setElementCategory(localListId, localElementId, localElementStatus, localElementsCategory) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].category = parseInt(localElementsCategory);
}
function setElementClassification(localListId, localElementId, localElementStatus, localElementClassification) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].classification = localElementClassification;
}
function setElementUser(localListId, localElementId, localElementStatus, localElementUser) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].user = localElementUser;
}
function setElementDue(localListId, localElementId, localElementStatus, localElementDue) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].due = localElementDue;
}
function setElementCreated(localListId, localElementId, localElementStatus, localElementCreated) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].created = localElementCreated;
}
function setElementChecklist(localListId, localElementId, localElementStatus, localElementChecklist) {
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
  localElement = remList[localElementId];
  remList.splice(localElementId, 1);
  addList.push(localElement);
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
  remList.splice(localElementId, 1);
}

// function changeElementCategory() {
//
// }

function reorderList(localListId, localElementId, direction) {
  $.each(todo, function (listId, listFields) {
    // if the searched for list matches one in the list
    if (listId === parseInt(localListId)) {
      //var localElements = listFields.elements;
      if (direction === "up" && localElementId !== 0 && listFields.openElements.length > 1) {
        var selectedElementUp = listFields.openElements[localElementId];
        var swapElementUp = listFields.openElements[localElementId - 1];

        listFields.openElements[localElementId] = swapElementUp;
        listFields.openElements[localElementId - 1] = selectedElementUp;
      }
      if (direction === "down" && localElementId !== listFields.openElements.length - 1 && listFields.openElements.length > 1) {
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

//elementModalTextAreaUserSaveAlerts

function compareElementModalTextarea() {
  if (elementCreateFlag == false) {
    var localListId = $("#modal-list").val();
    var localElementId = $("#modal-element").val();
    var localElementStatus = $("#modal-status").val();
    var localElement = getElement(localListId, localElementId, localElementStatus);
    if (localElement.description != $("#elementDescription").val()) {
      //console.log("desc diif");
      $("#elementDescriptionWarning").removeClass("hidden");
      $("#elementDescriptionWarning").addClass("flex");
      $("#elementDescription").addClass("user-save-alert-border");
    } else {
      $("#elementDescriptionWarning").addClass("hidden");
      $("#elementDescriptionWarning").removeClass("flex");
      $("#elementDescription").removeClass("user-save-alert-border");
    }
    if (localElement.comments != $("#elementComments").val()) {
      $("#elementCommentsWarning").removeClass("hidden");
      $("#elementCommentsWarning").addClass("flex");
      $("#elementComments").addClass("user-save-alert-border");
    } else {
      $("#elementCommentsWarning").addClass("hidden");
      $("#elementCommentsWarning").removeClass("flex");
      $("#elementComments").removeClass("user-save-alert-border");
    }
  }
}

function resetElementModalUserAlert() {
  $("#elementDescriptionWarning").addClass("hidden");
  $("#elementDescriptionWarning").removeClass("flex");
  $("#elementDescription").removeClass("user-save-alert-border");
  $("#elementCommentsWarning").addClass("hidden");
  $("#elementCommentsWarning").removeClass("flex");
  $("#elementComments").removeClass("user-save-alert-border");
}

$(document).on("keyup", function (e) {
  if ($("#elementDescription").is(":visible")) {
    compareElementModalTextarea();
  }
});

var version = 192; //update this to reflect the latest version of the todo
var devStatus = "development"; //use production or development for the status of the build

function checkVersion() {
  if (localStorage.getItem("version") === "null" || localStorage.getItem("version") === null) {
    updateVersion();
  } else if (version < localStorage.getItem("version") || devStatus === "development") {
    updateVersion();
  }
}

function updateVersion() {
  $.each(todo, function (listId, listFields) {
    //iterate through the lists
    repairList(listFields);
    $.each(listFields.openElements, function (elementId, elementFields) {
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

/*jshint esversion: 6 */
function setMarkdownDescription(content) {
  if (content != "") {
    $("#elementDescriptionMarkdownContainer").addClass("flex");
    $("#elementDescriptionMarkdownContainer").removeClass("hidden");
    document.getElementById("elementDescriptionMarkdownBody").innerHTML = marked(content, { breaks: true });
    highlightMarkdown();
  } else {
    $("#elementDescriptionMarkdownContainer").removeClass("flex");
    $("#elementDescriptionMarkdownContainer").addClass("hidden");
    document.getElementById("elementDescriptionMarkdownBody").innerHTML = "";
    $("#elementDescription").addClass("flex");
    $("#elementDescription").removeClass("hidden");
  }
}

function clickDescriptionMarkdownContainer() {
  $("#elementDescriptionMarkdownContainer").removeClass("flex");
  $("#elementDescriptionMarkdownContainer").addClass("hidden");
  $("#elementDescription").addClass("flex");
  $("#elementDescription").removeClass("hidden");
  autosize.update($("#elementDescription"));
  $("#elementDescription").focus();
}

function loseDescriptionMarkdownContainerFocus() {
  $("#elementDescriptionMarkdownContainer").addClass("flex");
  $("#elementDescriptionMarkdownContainer").removeClass("hidden");

  $("#elementDescription").removeClass("flex");
  $("#elementDescription").addClass("hidden");

  setMarkdownDescription($("#elementDescription").val());
}

function setMarkdownComments(content) {
  if (content != "") {
    $("#elementCommentsMarkdownContainer").addClass("flex");
    $("#elementCommentsMarkdownContainer").removeClass("hidden");
    document.getElementById("elementCommentsMarkdownBody").innerHTML = marked(content, { breaks: true });
    highlightMarkdown();
  } else {
    $("#elementCommentsMarkdownContainer").removeClass("flex");
    $("#elementCommentsMarkdownContainer").addClass("hidden");
    document.getElementById("elementCommentsMarkdownBody").innerHTML = "";
    $("#elementComments").addClass("flex");
    $("#elementComments").removeClass("hidden");
  }
}

function clickCommentsMarkdownContainer() {
  $("#elementCommentsMarkdownContainer").removeClass("flex");
  $("#elementCommentsMarkdownContainer").addClass("hidden");

  $("#elementComments").addClass("flex");
  $("#elementComments").removeClass("hidden");
  autosize.update($("#elementComments"));
  $("#elementComments").focus();
}

function loseCommentsMarkdownContainerFocus() {
  $("#elementCommentsMarkdownContainer").addClass("flex");
  $("#elementCommentsMarkdownContainer").removeClass("hidden");

  $("#elementComments").removeClass("flex");
  $("#elementComments").addClass("hidden");

  setMarkdownComments($("#elementComments").val());
}

function highlightMarkdown() {
  document.querySelectorAll("pre code").forEach(function (block) {
    hljs.highlightBlock(block);
  });
}

$(".modal-container").on("click", function (e) {
  if (e.target !== this) return;
  closeAllModals();
});

$(document).click(function () {
  closeAllDropdown();
});
function registerDropdownClickInterrupts() {
  $(".dropdown").click(function (e) {
    e.stopPropagation();
  });

  $(".list-button").click(function (e) {
    e.stopPropagation();
  });
}

registerDropdownClickInterrupts();

var globalListenToDrag = false;

function elementOnDragStartEvent(event, localListId, localElementId, localElementStatus) {
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
  $(populateListElementPlaceholder()).insertAfter($("#" + localListId + "-" + localElementId + "-" + localStatusIdCode));
}

function allowDrop(event) {
  if (globalListenToDrag) {
    event.preventDefault();
  }
}

function onElementDragOver(event, localListId, localElementId, localElementStatus) {
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
    $(populateListElementDrop(localListId, localElementId, localElementStatus)).insertBefore($("#" + localListId + "-" + localElementId + "-" + localStatusIdCode));
  }
}

function onPlaceholderDragOver() {
  $(".list-element-drop").remove();
}

function elementonDropEvent(event, localListIdDest, localElementIdDest, localElementStatusDest) {
  var localListId = event.dataTransfer.getData("localListId");
  var localElementId = event.dataTransfer.getData("localElementId");
  var localElementStatus = event.dataTransfer.getData("localElementStatus");

  if (localListId == localListIdDest) {
    moveWithinList(localListId, localElementId, localElementStatus, localListIdDest, localElementIdDest, localElementStatusDest);
  } else {
    moveListToList(localListId, localElementId, localElementStatus, localListIdDest, localElementIdDest, localElementStatusDest);
  }
}

function elementDragEnd(event) {
  globalListenToDrag = false;
  createListsAndElements();
}

// function listOnDragOver(event) {
//   // if (listen) {
//   //   $("list-body").append(populateListElementDrop(localListId, localElementId, localElementStatus))
//   // }
// }

function listOnDropEvent(event, destList) {
  var listen = globalListenToDrag;
  if (listen) {
    if (getList(destList).openElements.length === 0 && getList(destList).closedElements.length === 0) {
      //remove old placeholder
      $(".list-element-placeholder").remove();
      $(".list-element-drop").remove();
      var localListId = event.dataTransfer.getData("localListId");
      var localElementId = event.dataTransfer.getData("localElementId");
      var localElementStatus = event.dataTransfer.getData("localElementStatus");

      var itemBeingMoved = getElement(localListId, localElementId, localElementStatus);

      //getList(destList);
      if (localElementStatus == "open") {
        getList(destList).openElements.push(itemBeingMoved);
      } else if (localElementStatus == "closed") {
        getList(destList).closedElements.push(itemBeingMoved);
      }
      deleteElement(localListId, localElementId, localElementStatus);
    }
  }
}

function moveWithinList(localListId, localElementId, localElementStatus, localListIdDest, localElementIdDest, localElementStatusDest) {
  //if same status
  var itemBeingMoved = getElement(localListId, localElementId, localElementStatus);
  var list = getElementList(localListIdDest, localElementStatus);
  if (localElementStatus == localElementStatusDest) {
    // splice to new pos

    if (localElementIdDest < localElementId) {
      list.splice(localElementIdDest, 0, itemBeingMoved);
      var elementModifier = parseInt(localElementId) + 1;
      deleteElement(localListId, elementModifier, localElementStatus);
    } else if (localElementIdDest > localElementId) {
      list.splice(localElementIdDest, 0, itemBeingMoved);
      deleteElement(localListId, localElementId, localElementStatus);
    }
  } else {
    //append to same status as original
    list.push(itemBeingMoved);
    deleteElement(localListId, localElementId, localElementStatus);
  }
}

function moveListToList(localListId, localElementId, localElementStatus, localListIdDest, localElementIdDest, localElementStatusDest) {
  //if same status
  var itemBeingMoved = getElement(localListId, localElementId, localElementStatus);
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