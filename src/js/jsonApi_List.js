function createList(localListName, localOpenElements, localClosedElements, localDeletedElements) {
    localOpenElements = localOpenElements || "";
    localClosedElements = localClosedElements || "";
    localDeletedElements = localDeletedElements || "";
    var returnState = false;
    if (createJsonList()) {  //create the barebone json list
        var locaListId = todo.length - 1;
        setListName(locaListId, localListName); //as the list will be added on the end it's id will be todo.length - 1
        if(localOpenElements != "") {
            setListOpenElements(locaListId, localOpenElements);
        }
        if(localClosedElements != "") {
            setListClosedElements(locaListId, localClosedElements);
        }
        if(localDeletedElements != "") {
            setListDeletedElements(locaListId, localDeletedElements);
        }
        returnState = true;
    }
    return returnState;
}

function createJsonList() {
    var returnState = false;
    if (todo.length < 5) {  //limit to a max of 5 lists
        todo.push({
            "list_name": "",
            "openElements": [],
            "closedElements": [],
            "deletedElements": []
        });
        returnState = true;
    }
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
