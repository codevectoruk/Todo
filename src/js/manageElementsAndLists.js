function createListsAndElements() {
  updateStoredTodoList(); //updated the local storage list with the one that is currently stored in the variable
  $(".list-container").empty(); //empty the list container
  $.each(todo, function(listId, listFields) {
    //iterate through the lists
    var output = populateListFromJson(listId, listFields); //use the populateListFromJson function to create the html that goes into the list-container class
    $(".list-container").append(output); //append the output from populateListFromJson to the list-container class that is part of index.html
    output = "";
    $.each(listFields.openElements, function(elementId, elementFields) {
      //iterate through the openElements part of the current list that is being iterated through
      output += populateElementsFromJson(
        listId,
        elementId,
        elementFields,
        "open"
      );
    });
    $.each(listFields.closedElements, function(elementId, elementFields) {
      //iterate through the closedElements part of the current list that is being iterated through
      output += populateElementsFromJson(
        listId,
        elementId,
        elementFields,
        "closed"
      );
    });
    $("#list-" + listId).append(output); //append all of the elements to the list-container
    // $("#list-" + listId).append(populateListElementPlaceholder());
  });
  $(".list-container").append(populateAddAnotherList()); //append the "create another item" button to the list-container
  registerDropdownClickInterrupts();
}

function populateListFromJson(localListId, localListFields) {
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

function populateElementsFromJson(
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

function populateListElementPlaceholder() {
  var output =
    '<div ondragover="onPlaceholderDragOver()" class="list-element-placeholder"></div>';
  return output;
}

function populateListElementDrop(
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

function populateAddAnotherList() {
  //contains the divs for the "Add another item" for the list-container
  var output =
    '<div class="add-list" ' +
    'onclick="buttonCreateList()"><i class="fas fa-plus"></i> ' +
    "Add another item</div>";
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
