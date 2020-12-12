import jquery from "../js-lib/jquery-3.4.0.min";

export default window.$ = window.jQuery = jquery;

export function updateStoredTodoList() {
  localStorage.setItem("todo", JSON.stringify(window.todo));
}

export function firstTimeLoadLocalStorage() {
  if (
    localStorage.getItem("todo") === "null" ||
    localStorage.getItem("todo") === null
  ) {
    window.todo = [];
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

export function createListsAndElements() {
  updateStoredTodoList(); //updated the local storage list with the one that is currently stored in the variable
  window.jQuery(".list-container").empty(); //empty the list container
  $.each(window.todo, function (listId, listFields) {
    //iterate through the lists
    var output = populateListFromJson(listId, listFields); //use the populateListFromJson function to create the html that goes into the list-container class
    window.jQuery(".list-container").append(output); //append the output from populateListFromJson to the list-container class that is part of index.html
    output = "";
    $.each(listFields.openElements, function (elementId, elementFields) {
      //iterate through the openElements part of the current list that is being iterated through
      output += populateElementsFromJson(
        listId,
        elementId,
        elementFields,
        "open"
      );
    });
    $.each(listFields.closedElements, function (elementId, elementFields) {
      //iterate through the closedElements part of the current list that is being iterated through
      output += populateElementsFromJson(
        listId,
        elementId,
        elementFields,
        "closed"
      );
    });
    window.jQuery("#list-" + listId).append(output); //append all of the elements to the list-container
    // window.jQuery("#list-" + listId).append(populateListElementPlaceholder());
  });
  window.jQuery(".list-container").append(populateAddAnotherList()); //append the "create another item" button to the list-container
  registerDropdownClickInterrupts();
}

export function populateListFromJson(localListId, localListFields) {
  var returnState =
    "<div class='list' ondrop='listOnDropEvent(event, " +
    localListId +
    ")' ondragover='listOnDragOver(event," +
    localListId +
    ")'><div class='list-header'>" +
    "<div class='list-title'>" +
    localListFields.list_name +
    "</div><div class='button-container'><div class='list-button' " +
    "onclick='toggleDropdown(" +
    localListId +
    ")'><i class='fas fa-ellipsis-h'></i></div><div " +
    "class='dropdown hidden' id='id-dropdown-" +
    localListId +
    "'><div class='dropdown-title'><div " +
    "class='dropdown-title-text'>List Actions</div><i " +
    "class='fas fa-times' onclick='toggleDropdown(" +
    localListId +
    ")'></i></div><div class='dropdown-element' " +
    "onclick='prepareModalRenameList(" +
    localListId +
    ")'>Rename List</div><div class='dropdown-element' " +
    "onclick='prepareModalDeleteList(" +
    localListId +
    ")'>Delete List</div></div></div></div><div class='list-body scrollbar-alt' " +
    "id='list-" +
    localListId +
    "'></div><div class='list-footer' onclick='buttonOpenElementModalForElementCreate(" +
    localListId +
    ")'><i class='fas fa-plus'></i> Add another item</div></div>";
  return returnState;
}

export function populateElementsFromJson(
  localListId,
  localElementId,
  localElementFields,
  localElementStatus
) {
  var returnState = "";
  var statusStringA = "";
  var statusStringB = "";
  var statusStringC = "";
  var statusStringD = "";
  var dueDateTag = "";
  var idStatusCode = 0;
  var categoryTag = populateCategoryField(localElementFields.category);
  if (localElementFields.due != "" && localElementStatus == "open") {
    dueDateTag =
      "<div class='tag tag-" +
      calculateRisk(localElementFields.due) +
      "'>" +
      timeTill(localElementFields.due) +
      "</div>";
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
  returnState =
    "<div class='list-element " +
    statusStringA +
    "' id=\"" +
    localListId +
    "-" +
    localElementId +
    "-" +
    idStatusCode +
    '"' +
    " draggable='true' ondragend='elementDragEnd(event)' ondrop='elementonDropEvent(event," +
    localListId +
    ", " +
    localElementId +
    ', "' +
    localElementStatus +
    "\")' ondragover='onElementDragOver(event," +
    localListId +
    ", " +
    localElementId +
    ', "' +
    localElementStatus +
    "\")' ondragstart='elementOnDragStartEvent(event," +
    localListId +
    ", " +
    localElementId +
    ', "' +
    localElementStatus +
    "\")'>" +
    categoryTag +
    "<div class='status' onclick='" +
    statusStringB +
    "(" +
    localListId +
    ", " +
    localElementId +
    ")'><i class=\"" +
    statusStringC +
    "\"></i></div><div class='title' onclick='buttonOpenElementModalForElementUpdate(" +
    localListId +
    ", " +
    localElementId +
    ', "' +
    statusStringD +
    "\")'>" +
    localElementFields.title +
    dueDateTag +
    "</div><div class='position'>";
  if (localElementStatus === "closed") {
    returnState +=
      "<div class='promote' onclick='prepareModalDelete(" +
      localListId +
      ", " +
      localElementId +
      ')\'><i class="far fa-trash-alt"></i></div></div>';
  }
  returnState += "</div></div>";
  return returnState;
}

export function populateListElementPlaceholder() {
  var output =
    '<div ondragover="onPlaceholderDragOver()" class="list-element-placeholder"></div>';
  return output;
}

export function populateListElementDrop(
  localListId,
  localElementId,
  localElementStatus
) {
  var output =
    "<div class='list-element-drop' ondrop='elementonDropEvent(event," +
    localListId +
    "," +
    localElementId +
    ', "' +
    localElementStatus +
    "\")'></div>";
  return output;
}

export function populateAddAnotherList() {
  //contains the divs for the "Add another item" for the list-container
  var output =
    '<div class="add-list" ' +
    'onclick="buttonCreateList()"><i class="fas fa-plus"></i> ' +
    "Add another item</div>";
  return output;
}

export function populateCategoryField(localElementFieldsCategory) {
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
export function prepareModalDelete(localListId, localElementId) {
  window.jQuery("#modal-confirm-list").val(localListId);
  window.jQuery("#modal-confirm-element").val(localElementId);
  window.jQuery("#deleteElementButton").show();
  window.jQuery("#deleteListButton").hide();
  closeAllDropdown();
  toggleConfirmationModalVisibility();
}

export function prepareModalDeleteList(localListId) {
  window.jQuery("#modal-confirm-list").val(localListId);
  window.jQuery("#deleteElementButton").hide();
  window.jQuery("#deleteListButton").show();
  closeAllDropdown();
  toggleConfirmationModalVisibility();
}

export function prepareModalRenameList(listId) {
  window.jQuery("#modal-rename-list").val(listId);
  window.jQuery("#modal-list-rename-input").val(window.todo[listId].list_name);
  closeAllDropdown();
  toggleRenameListModal();
  window.jQuery("#modal-list-rename-input").focus();
}

//toggles the confirmation modal visibility
export function toggleConfirmationModalVisibility() {
  if (window.jQuery("#id-confirmation-modal").hasClass("hidden")) {
    window.jQuery("#id-confirmation-modal").addClass("flex");
    window.jQuery("#id-confirmation-modal").removeClass("hidden");
  } else {
    window.jQuery("#id-confirmation-modal").removeClass("flex");
    window.jQuery("#id-confirmation-modal").addClass("hidden");
  }
}

//toggles the element modal visibility
export function toggleElementModalVisibility() {
  if (window.jQuery("#id-element-modal").hasClass("hidden")) {
    window.jQuery("#id-element-modal").addClass("flex");
    window.jQuery("#id-element-modal").removeClass("hidden");
  } else {
    window.jQuery("#id-element-modal").removeClass("flex");
    window.jQuery("#id-element-modal").addClass("hidden");
    elementCreateFlag = false;

    window.jQuery("#elementDescription").removeClass("flex");
    window.jQuery("#elementDescription").addClass("hidden");
    window.jQuery("#elementComments").removeClass("flex");
    window.jQuery("#elementComments").addClass("hidden");

    window.jQuery("#elementDescriptionMarkdownContainer").addClass("flex");
    window.jQuery("#elementDescriptionMarkdownContainer").removeClass("hidden");
    window.jQuery("#elementCommentsMarkdownContainer").addClass("flex");
    window.jQuery("#elementCommentsMarkdownContainer").removeClass("hidden");
  }
}

export function closeAllModals() {
  window.jQuery(".modal-container").removeClass("flex");
  window.jQuery(".modal-container").addClass("hidden");
}

export function closeAllDropdown() {
  window.jQuery(".dropdown").removeClass("flex");
  window.jQuery(".dropdown").addClass("hidden");
}

export function toggleRenameListModal() {
  if (window.jQuery("#id-rename-modal").hasClass("hidden")) {
    window.jQuery("#id-rename-modal").addClass("flex");
    window.jQuery("#id-rename-modal").removeClass("hidden");
  } else {
    window.jQuery("#id-rename-modal").removeClass("flex");
    window.jQuery("#id-rename-modal").addClass("hidden");
  }
}

export function toggleDropdown(buttonId) {
  if (window.jQuery("#id-dropdown-" + buttonId).hasClass("hidden")) {
    // hide all other dropdowns
    closeAllDropdown();
    //show this dropdown
    window.jQuery("#id-dropdown-" + buttonId).removeClass("hidden");
    window.jQuery("#id-dropdown-" + buttonId).addClass("flex");
  } else {
    //hide this dropdown
    window.jQuery("#id-dropdown-" + buttonId).removeClass("flex");
    window.jQuery("#id-dropdown-" + buttonId).addClass("hidden");
  }
}

export function buttonChangeElementStatusToOpen(listId, localElementId) {
  changeElementStatusToOpen(listId, localElementId);
  createListsAndElements();
}

export function buttonChangeElementStatusToClosed(listId, localElementId) {
  changeElementStatusToClosed(listId, localElementId);
  createListsAndElements();
}

export function buttonChangeElementStatusToDeleted() {
  var localListId = window.jQuery("#modal-confirm-list").val();
  var localElementId = window.jQuery("#modal-confirm-element").val();
  changeElementStatusToDeleted(localListId, localElementId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List item successfully deleted.", "success", 5000);
}

export function buttonCreateList() {
  createList("New List");
  createListsAndElements();
}

export function buttonDeleteList() {
  var localListId = window.jQuery("#modal-confirm-list").val();
  deleteList(localListId);
  createListsAndElements();
  toggleConfirmationModalVisibility();
  generateUserAlert("List successfully deleted.", "success", 5000);
}

export function buttonOpenElementModalForElementUpdate(
  localListId,
  localElementId,
  localElementStatus
) {
  var localElement = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
  resetElementModalUserAlert();
  window.jQuery("#modal-list").val(localListId);
  window.jQuery("#modal-element").val(localElementId);
  window.jQuery("#modal-status").val(localElementStatus);
  window.jQuery("#elementTitle").val(localElement.title);
  window.jQuery("#elementDescription").val(localElement.description);
  setMarkdownDescription(localElement.description);
  window.jQuery("#elementComments").val(localElement.comments);
  setMarkdownComments(localElement.comments);
  window.jQuery("#elementCategory").val(parseInt(localElement.category));
  window.jQuery("#elementDue").val(localElement.due);
  window.jQuery("#element-modal-button-create").hide();
  window.jQuery("#element-modal-button-update").show();
  window.jQuery("#element-modal-update-title").show();
  window.jQuery("#element-modal-create-title").hide();
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update(window.jQuery("#elementDescription"));
  autosize.update(window.jQuery("#elementComments"));
  window.jQuery("#elementTitle").focus();
}

export function buttonOpenElementModalForElementCreate(listId) {
  window.elementCreateFlag = true;
  resetElementModalUserAlert();
  window.jQuery("#elementTitle").val("");
  window.jQuery("#elementDescription").val("");
  setMarkdownDescription("");
  window.jQuery("#elementComments").val("");
  setMarkdownComments("");
  window.jQuery("#elementCategory").val(0);
  window.jQuery("#elementDue").val("");
  window.jQuery("#element-modal-button-create").show();
  window.jQuery("#element-modal-button-update").hide();
  window.jQuery("#element-modal-update-title").hide();
  window.jQuery("#element-modal-create-title").show();
  window.jQuery("#modal-list").val(listId);
  closeAllDropdown();
  toggleElementModalVisibility();
  autosize.update(window.jQuery("#elementDescription"));
  autosize.update(window.jQuery("#elementComments"));
  window.jQuery("#elementTitle").focus();
}

export function buttonUpdateElement() {
  var localListId = window.jQuery("#modal-list").val();
  var localElementId = window.jQuery("#modal-element").val();
  var localElementStatus = window.jQuery("#modal-status").val();
  setElementTitle(
    localListId,
    localElementId,
    localElementStatus,
    window.jQuery("#elementTitle").val()
  );
  setElementDescription(
    localListId,
    localElementId,
    localElementStatus,
    window.jQuery("#elementDescription").val()
  );
  setElementComments(
    localListId,
    localElementId,
    localElementStatus,
    window.jQuery("#elementComments").val()
  );
  setElementCategory(
    localListId,
    localElementId,
    localElementStatus,
    parseInt(window.jQuery("#elementCategory").val())
  );
  setElementDue(
    localListId,
    localElementId,
    localElementStatus,
    window.jQuery("#elementDue").val()
  );
  toggleElementModalVisibility();
  createListsAndElements();
}

export function buttonCreateNewElement() {
  var localListId = window.jQuery("#modal-list").val();
  var localElementState = "open";
  var localElementTitle = window.jQuery("#elementTitle").val();
  var localElementDescription = window.jQuery("#elementDescription").val();
  var localElementComments = window.jQuery("#elementComments").val();
  var localElementsCategory = parseInt(window.jQuery("#elementCategory").val());
  var localElementClassification = "";
  var localElementUser = "";
  var localElementDue = window.jQuery("#elementDue").val();
  var localElementCreated = "";
  var localElementChecklist = "";
  createElement(
    localListId,
    localElementState,
    localElementTitle,
    localElementDescription,
    localElementComments,
    localElementsCategory,
    localElementClassification,
    localElementUser,
    localElementDue,
    localElementCreated,
    localElementChecklist
  );
  toggleElementModalVisibility();
  createListsAndElements();
  window.elementCreateFlag = false;
}

export function buttonRenameList() {
  var localListId = window.jQuery("#modal-rename-list").val();
  var localListName = window.jQuery("#modal-list-rename-input").val();
  setListName(localListId, localListName);
  toggleRenameListModal();
  closeAllDropdown();
  createListsAndElements();
}

export function buttonClearDueDate() {
  window.jQuery("#elementDue").val("");
}

export function autoUpdate() {
  var localTodo = JSON.parse(localStorage.getItem("todo"));
  if (localStorage.getItem("todo") != null) {
    if (!compareJsonArrays(window.todo, localTodo)) {
      window.todo = JSON.parse(localStorage.getItem("todo"));
      createListsAndElements();
      generateUserAlert(
        "It looks like you updated your list on another tab, it has been updated on this tab too!",
        "information",
        5000
      );
    }
  } else {
    firstTimeLoadLocalStorage();
    createListsAndElements();
  }
}

export function compareJsonArrays(x, y) {
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
      if (typeof x[p] !== "object") {
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

export function themeChanger(theme) {
  if (theme === "default") {
    window.currentTheme = "default";
    window.jQuery("body").removeClass();
    window.jQuery("body").addClass("theme-default");
  }
  if (theme === "dark") {
    window.currentTheme = "dark";
    window.jQuery("body").removeClass();
    window.jQuery("body").addClass("theme-dark");
  }
  if (theme === "light") {
    window.currentTheme = "light";
    window.jQuery("body").removeClass();
    window.jQuery("body").addClass("theme-light");
  }
  saveTheme(theme);
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  themeChanger(localStorage.getItem("theme"));
}

export function autoChangeTheme() {
  if (localStorage.getItem("theme") != null) {
    if (localStorage.getItem("theme") !== window.currentTheme) {
      loadTheme();
      generateUserAlert(
        "It looks like you updated your theme on another tab, it has been updated on this tab too!",
        "information",
        5000
      );
    }
  } else {
    setDefaultTheme();
  }
}

export function setDefaultTheme() {
  if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "default");
  }
}

export function downloadObjectAsJson() {
  var exportObj = window.todo;
  var today = new Date();
  var exportName = "todoBackup_" + today.toISOString();
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj, null, 2));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function generateUserAlert(inputBody, inputAlertType, lifespan) {
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
  output =
    "<div class='userAlert " +
    alertClass +
    "'id='alertId-" +
    random +
    "'><div class='icon'><i class='" +
    icon +
    "'></i></div><div class='text'><div class='text-title'>" +
    title +
    "</div><div class='text-body'>" +
    body +
    "</div></div></div>";
  window.jQuery(".userAlert-container").append(output);
  if (lifespan !== 0) {
    setTimeout(function () {
      window.jQuery("#alertId-" + random).fadeOut(2000, function () {
        window.jQuery("#alertId-" + random).remove();
      });
    }, lifespan);
  }
}

export function timeTill(futureDate) {
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

export function calculateRisk(futureDate) {
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

export function getElementList(localListId, localStatus) {
  var returnState;
  if (localStatus == "open") {
    returnState = window.todo[localListId].openElements;
  } else if (localStatus == "closed") {
    returnState = window.todo[localListId].closedElements;
  } else if (localStatus == "deleted") {
    returnState = window.todo[localListId].deletedElements;
  }
  return returnState;
}

export function createElement(
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
        localElementId = window.todo[localListId].openElements.length - 1;
      } else if (localElementStatus == "closed") {
        localElementId = window.todo[localListId].closedElements.length - 1;
      } else if (localElementStatus == "deleted") {
        localElementId = window.todo[localListId].deletedElements.length - 1;
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

export function createJsonElement(localListId, localElementStatus) {
  var returnState = false;
  var localList = getElementList(localListId, localElementStatus);
  localList.push({
    title: "",
    description: "",
    classification: "",
    user: "",
    due: "",
    created: "",
    checklist: [],
  });
  returnState = true;
  return returnState;
}

export function getElement(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId];
}

export function getElementTitle(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].title;
}

export function getElementDescription(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].description;
}

export function getElementComments(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].comments;
}

export function getElementCategory(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].category;
}

export function getElementClassification(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].classification;
}

export function getElementUser(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].user;
}

export function getElementDue(localListId, localElementId, localElementStatus) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].due;
}

export function getElementCreated(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].created;
}

export function getElementChecklist(
  localListId,
  localElementId,
  localElementStatus
) {
  var localList = getElementList(localListId, localElementStatus);
  return localList[localElementId].checklist;
}

export function setElementTitle(
  localListId,
  localElementId,
  localElementStatus,
  localElementTitle
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].title = localElementTitle;
}
export function setElementDescription(
  localListId,
  localElementId,
  localElementStatus,
  localElementDescription
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].description = localElementDescription;
}
export function setElementComments(
  localListId,
  localElementId,
  localElementStatus,
  localElementComments
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].comments = localElementComments;
}
export function setElementCategory(
  localListId,
  localElementId,
  localElementStatus,
  localElementsCategory
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].category = parseInt(localElementsCategory);
}
export function setElementClassification(
  localListId,
  localElementId,
  localElementStatus,
  localElementClassification
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].classification = localElementClassification;
}
export function setElementUser(
  localListId,
  localElementId,
  localElementStatus,
  localElementUser
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].user = localElementUser;
}
export function setElementDue(
  localListId,
  localElementId,
  localElementStatus,
  localElementDue
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].due = localElementDue;
}
export function setElementCreated(
  localListId,
  localElementId,
  localElementStatus,
  localElementCreated
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].created = localElementCreated;
}
export function setElementChecklist(
  localListId,
  localElementId,
  localElementStatus,
  localElementChecklist
) {
  var localList = getElementList(localListId, localElementStatus);
  localList[localElementId].checklist = localElementChecklist;
}

export function changeElementStatus(localListId, localElementId, toStatus) {
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

export function changeElementStatusToDeleted(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "deleted");
}

export function changeElementStatusToClosed(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "closed");
}

export function changeElementStatusToOpen(localListId, localElementId) {
  changeElementStatus(localListId, localElementId, "open");
}

export function deleteElement(localListId, localElementId, localElementStatus) {
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

export function reorderList(localListId, localElementId, direction) {
  $.each(window.todo, function (listId, listFields) {
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

export function createList(
  localListName,
  localOpenElements,
  localClosedElements,
  localDeletedElements
) {
  localOpenElements = localOpenElements || "";
  localClosedElements = localClosedElements || "";
  localDeletedElements = localDeletedElements || "";
  var returnState = false;
  if (createJsonList()) {
    //create the barebone json list
    var locaListId = window.todo.length - 1;
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

export function createJsonList() {
  var returnState = false;
  window.todo.push({
    list_name: "",
    openElements: [],
    closedElements: [],
    deletedElements: [],
  });
  returnState = true;
  return returnState;
}

export function deleteList(localListId) {
  var returnState = false;
  try {
    window.todo.splice(localListId, 1);
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

export function getList(localListId) {
  return window.todo[localListId];
}

export function getListName(localListId) {
  return window.todo[localListId].list_name;
}

export function getListOpenElements(localListId) {
  return window.todo[localListId].openElements;
}

export function getListClosedElements(localListId) {
  return window.todo[localListId].closedElements;
}

export function getListDeletedElements(localListId) {
  return window.todo[localListId].deletedElements;
}

export function setListName(localListId, localListName) {
  var returnState = false;
  try {
    window.todo[localListId].list_name = localListName;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

export function setListOpenElements(localListId, localListOpenElements) {
  var returnState = false;
  try {
    window.todo[localListId].openElements = localListOpenElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

export function setListClosedElements(localListId, localListClosedElements) {
  var returnState = false;
  try {
    window.todo[localListId].closedElements = localListClosedElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

export function setListDeletedElements(localListId, localListDeletedElements) {
  var returnState = false;
  try {
    window.todo[localListId].deletedElements = localListDeletedElements;
    returnState = true;
  } catch (err) {
    returnState = false;
  }
  return returnState;
}

export function compareElementModalTextarea() {
  if (window.elementCreateFlag == false) {
    var localListId = window.jQuery("#modal-list").val();
    var localElementId = window.jQuery("#modal-element").val();
    var localElementStatus = window.jQuery("#modal-status").val();
    var localElement = getElement(
      localListId,
      localElementId,
      localElementStatus
    );
    if (
      localElement.description != window.jQuery("#elementDescription").val()
    ) {
      //console.log("desc diif");
      window.jQuery("#elementDescriptionWarning").removeClass("hidden");
      window.jQuery("#elementDescriptionWarning").addClass("flex");
      window.jQuery("#elementDescription").addClass("user-save-alert-border");
    } else {
      window.jQuery("#elementDescriptionWarning").addClass("hidden");
      window.jQuery("#elementDescriptionWarning").removeClass("flex");
      window
        .jQuery("#elementDescription")
        .removeClass("user-save-alert-border");
    }
    if (localElement.comments != window.jQuery("#elementComments").val()) {
      window.jQuery("#elementCommentsWarning").removeClass("hidden");
      window.jQuery("#elementCommentsWarning").addClass("flex");
      window.jQuery("#elementComments").addClass("user-save-alert-border");
    } else {
      window.jQuery("#elementCommentsWarning").addClass("hidden");
      window.jQuery("#elementCommentsWarning").removeClass("flex");
      window.jQuery("#elementComments").removeClass("user-save-alert-border");
    }
  }
}

export function resetElementModalUserAlert() {
  window.jQuery("#elementDescriptionWarning").addClass("hidden");
  window.jQuery("#elementDescriptionWarning").removeClass("flex");
  window.jQuery("#elementDescription").removeClass("user-save-alert-border");
  window.jQuery("#elementCommentsWarning").addClass("hidden");
  window.jQuery("#elementCommentsWarning").removeClass("flex");
  window.jQuery("#elementComments").removeClass("user-save-alert-border");
}

export function checkVersion() {
  if (
    localStorage.getItem("version") === "null" ||
    localStorage.getItem("version") === null
  ) {
    updateVersion();
  } else if (
    window.version < localStorage.getItem("version") ||
    window.devStatus === "development"
  ) {
    updateVersion();
  }
}

export function updateVersion() {
  $.each(window.todo, function (listId, listFields) {
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
      localStorage.setItem("version", window.version);
    });
  });
}

export function repairElement(listId, elementId, elementFields, listStatus) {
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

export function repairList(listFields) {
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

export function setMarkdownDescription(content) {
  if (content != "") {
    window.jQuery("#elementDescriptionMarkdownContainer").addClass("flex");
    window.jQuery("#elementDescriptionMarkdownContainer").removeClass("hidden");
    document.getElementById(
      "elementDescriptionMarkdownBody"
    ).innerHTML = marked(content, { breaks: true });
    highlightMarkdown();
  } else {
    window.jQuery("#elementDescriptionMarkdownContainer").removeClass("flex");
    window.jQuery("#elementDescriptionMarkdownContainer").addClass("hidden");
    document.getElementById("elementDescriptionMarkdownBody").innerHTML = "";
    window.jQuery("#elementDescription").addClass("flex");
    window.jQuery("#elementDescription").removeClass("hidden");
  }
}

export function clickDescriptionMarkdownContainer() {
  window.jQuery("#elementDescriptionMarkdownContainer").removeClass("flex");
  window.jQuery("#elementDescriptionMarkdownContainer").addClass("hidden");
  window.jQuery("#elementDescription").addClass("flex");
  window.jQuery("#elementDescription").removeClass("hidden");
  autosize.update(window.jQuery("#elementDescription"));
  window.jQuery("#elementDescription").focus();
}

export function loseDescriptionMarkdownContainerFocus() {
  window.jQuery("#elementDescriptionMarkdownContainer").addClass("flex");
  window.jQuery("#elementDescriptionMarkdownContainer").removeClass("hidden");

  window.jQuery("#elementDescription").removeClass("flex");
  window.jQuery("#elementDescription").addClass("hidden");

  setMarkdownDescription(window.jQuery("#elementDescription").val());
}

export function setMarkdownComments(content) {
  if (content != "") {
    window.jQuery("#elementCommentsMarkdownContainer").addClass("flex");
    window.jQuery("#elementCommentsMarkdownContainer").removeClass("hidden");
    document.getElementById(
      "elementCommentsMarkdownBody"
    ).innerHTML = marked(content, { breaks: true });
    highlightMarkdown();
  } else {
    window.jQuery("#elementCommentsMarkdownContainer").removeClass("flex");
    window.jQuery("#elementCommentsMarkdownContainer").addClass("hidden");
    document.getElementById("elementCommentsMarkdownBody").innerHTML = "";
    window.jQuery("#elementComments").addClass("flex");
    window.jQuery("#elementComments").removeClass("hidden");
  }
}

export function clickCommentsMarkdownContainer() {
  window.jQuery("#elementCommentsMarkdownContainer").removeClass("flex");
  window.jQuery("#elementCommentsMarkdownContainer").addClass("hidden");

  window.jQuery("#elementComments").addClass("flex");
  window.jQuery("#elementComments").removeClass("hidden");
  autosize.update(window.jQuery("#elementComments"));
  window.jQuery("#elementComments").focus();
}

export function loseCommentsMarkdownContainerFocus() {
  window.jQuery("#elementCommentsMarkdownContainer").addClass("flex");
  window.jQuery("#elementCommentsMarkdownContainer").removeClass("hidden");

  window.jQuery("#elementComments").removeClass("flex");
  window.jQuery("#elementComments").addClass("hidden");

  setMarkdownComments(window.jQuery("#elementComments").val());
}

export function highlightMarkdown() {
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.highlightBlock(block);
  });
}

export function registerDropdownClickInterrupts() {
  window.jQuery(".dropdown").click(function (e) {
    e.stopPropagation();
  });

  window.jQuery(".list-button").click(function (e) {
    e.stopPropagation();
  });
}

export function elementOnDragStartEvent(
  event,
  localListId,
  localElementId,
  localElementStatus
) {
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
  window
    .jQuery(populateListElementPlaceholder())
    .insertAfter(
      window.jQuery(
        "#" + localListId + "-" + localElementId + "-" + localStatusIdCode
      )
    );
}

export function onElementDragOver(
  event,
  localListId,
  localElementId,
  localElementStatus
) {
  var listen = globalListenToDrag;
  if (listen) {
    event.preventDefault();
    var localStatusIdCode = 0;
    if (localElementStatus == "open") {
      localStatusIdCode = 0;
    } else if (localElementStatus == "closed") {
      localStatusIdCode = 1;
    }
    //remove old placeholder
    window.jQuery(".list-element-placeholder").remove();
    window.jQuery(".list-element-drop").remove();
    //add new placeholder
    window
      .jQuery(
        populateListElementDrop(localListId, localElementId, localElementStatus)
      )
      .insertBefore(
        window.jQuery(
          "#" + localListId + "-" + localElementId + "-" + localStatusIdCode
        )
      );
  }
}

export function onPlaceholderDragOver() {
  window.jQuery(".list-element-drop").remove();
}

export function elementonDropEvent(
  event,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  var localListId = event.dataTransfer.getData("localListId");
  var localElementId = event.dataTransfer.getData("localElementId");
  var localElementStatus = event.dataTransfer.getData("localElementStatus");

  if (localListId == localListIdDest) {
    moveWithinList(
      localListId,
      localElementId,
      localElementStatus,
      localListIdDest,
      localElementIdDest,
      localElementStatusDest
    );
  } else {
    moveListToList(
      localListId,
      localElementId,
      localElementStatus,
      localListIdDest,
      localElementIdDest,
      localElementStatusDest
    );
  }
}

export function elementDragEnd(event) {
  globalListenToDrag = false;
  createListsAndElements();
}

export function listOnDragOver(event, destList) {
  var listen = globalListenToDrag;
  if (listen) {
    event.preventDefault();
    if (
      getList(destList).openElements.length === 0 &&
      getList(destList).closedElements.length === 0
    ) {
      window.jQuery(".list-element-placeholder").remove();
      window.jQuery(".list-element-drop").remove();
    }
  }
}

export function listOnDropEvent(event, destList) {
  var listen = globalListenToDrag;
  if (listen) {
    if (
      getList(destList).openElements.length === 0 &&
      getList(destList).closedElements.length === 0
    ) {
      var localListId = event.dataTransfer.getData("localListId");
      var localElementId = event.dataTransfer.getData("localElementId");
      var localElementStatus = event.dataTransfer.getData("localElementStatus");

      var itemBeingMoved = getElement(
        localListId,
        localElementId,
        localElementStatus
      );

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

export function moveWithinList(
  localListId,
  localElementId,
  localElementStatus,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  //if same status
  var itemBeingMoved = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
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

export function moveListToList(
  localListId,
  localElementId,
  localElementStatus,
  localListIdDest,
  localElementIdDest,
  localElementStatusDest
) {
  //if same status
  var itemBeingMoved = getElement(
    localListId,
    localElementId,
    localElementStatus
  );
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

export function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}
