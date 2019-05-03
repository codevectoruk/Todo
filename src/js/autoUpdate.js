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
      if (typeof(x[p]) !== "object") {
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
window.setInterval(function() {
  autoUpdate();
}, 5000);

// auto update the lists and elements one a minute
window.setInterval(function() {
  createListsAndElements();
}, 60000);
