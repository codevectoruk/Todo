function findElementList(listId, status) {
    var returnState = null;
    if (status === "open") {
        $.each(todo, function (i) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                returnState = todo[i].openElements;
            }
        });
    }
    if (status === "closed") {
        $.each(todo, function (i) {
            // if the searched for list matches one in thelist
            if (i === parseInt(listId)) {
                returnState = todo[i].closedElements;
            }
        });
    }
    if (status === "deleted") {
        $.each(todo, function (i) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                returnState = todo[i].deletedElements;
            }
        });
    }
    return returnState;
}

function findElement(listId, element, status) {
    var returnState = null;
    if (status === "open") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.openElements, function (i2) {
                    if (i2 === parseInt(element)) {
                        returnState = todo[i].openElements[i2];
                    }
                });
            }
        });
    }
    if (status === "closed") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.closedElements, function (i2) {
                    if (i2 === parseInt(element)) {
                        returnState = todo[i].closedElements[i2];
                    }
                });
            }
        });
    }
    if (status === "deleted") {
        $.each(todo, function (i, field) {
            // if the searched for list matches one in the list
            if (i === parseInt(listId)) {
                $.each(field.closedElements, function (i2) {
                    if (i2 === parseInt(element)) {
                        returnState = todo[i].deletedElements[i2];
                    }
                });
            }
        });
    }
    return returnState;
}

function findList(listId) {
    var returnState = null;
    $.each(todo, function (i) {
        // if the searched for list matches one in the list
        if (i === parseInt(listId)) {
            returnState = todo[i];
        }
    });
    return returnState;
}
