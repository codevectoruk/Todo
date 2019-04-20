function autoUpdate() {
    var localTodo = JSON.parse(localStorage.getItem("todo"));
    if(localStorage.getItem("todo") != null){
        if(!compareJsonArrays(todo, localTodo)) {
            todo = JSON.parse(localStorage.getItem("todo"));
            createListsAndElements();
        }
    } else {
        firstTimeLoadLocalStorage();
    }
}

function compareJsonArrays( x, y ) {
    if ( x === y ) {
        return true;
    }
    if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
        return false;
    }
    if ( x.constructor !== y.constructor ) {
        return false;
    }
    for ( var p in x ) {
        if ( x.hasOwnProperty( p ) ) {
            if ( ! y.hasOwnProperty( p ) ) {
                return false;
            }
            if ( x[ p ] === y[ p ] ) {
                continue;
            }
            if ( typeof( x[ p ] ) !== "object" ) {
                return false;
            }
            if ( !compareJsonArrays( x[ p ],  y[ p ] ) ) {
                return false;
            }
        }
    }

    for ( p in y ) {
        if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
            return false;
        }
    }
    return true;
}

window.setInterval(function(){
    autoUpdate();
}, 1000);
