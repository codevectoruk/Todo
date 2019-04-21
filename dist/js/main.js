function firstTimeLoadLocalStorage(){null===localStorage.getItem("todo")&&(localStorage.setItem("todo",JSON.stringify(todoListExample)),todo=JSON.parse(localStorage.getItem("todo")))}function updateStoredTodoList(){localStorage.setItem("todo",JSON.stringify(todo))}function firstTimeLoadLocalStorage(){null===localStorage.getItem("todo")&&(localStorage.setItem("todo",JSON.stringify(todoListExample)),todo=JSON.parse(localStorage.getItem("todo")))}function createListsAndElements(){updateStoredTodoList(),$(".list-container").empty(),$.each(todo,function(o,e){var t=createListFromJson(o,e);$(".list-container").append(t);var n="",i="";$.each(e.openElements,function(e,t){n+=createElementsFromJson(o,e,t,"open")}),$("#list-"+o).append(n),$.each(e.closedElements,function(e,t){i+=createElementsFromJson(o,e,t,"closed")}),$("#list-"+o).append(i)}),$(".list-container").append('<div class="add-list" onclick="createNewList()"><i class="fas fa-plus"></i> Add another item</div>')}function createListFromJson(e,t){return'<div class="list"><div class="list-header"><div class="list-title">'+t.list_name+'</div><div class="button-container"><div class="list-button" onclick="toggleDropdown('+e+')"><i class="fas fa-ellipsis-h"></i></div><div class="dropdown hidden" id="id-dropdown-'+e+'"><div class="dropdown-title"><div class="dropdown-title-text">List Actions</div><i class="fas fa-times" onclick="toggleDropdown('+e+')"></i></div><div class="dropdown-element" onclick="prepareModalRenameList('+e+')">Rename List</div><div class="dropdown-element" onclick="prepareModalDeleteList('+e+')">Delete List</div></div></div></div><div class="list-body" id="list-'+e+'"></div><div class="list-footer" onclick="buttonOpenElementModalForElementCreate('+e+')"><i class="fas fa-plus"></i> Add another item</div></div>'}function createElementsFromJson(e,t,o,n){var i="",l="",s="",a="",d="";return"open"===n&&(l="status-open",s="elementStatusToClosed",a="far fa-square",d="open"),"closed"===n&&(l="status-closed",s="elementStatusToOpen",a="fas fa-check-square",d="closed"),i="<div class='list-element "+l+"'><div class='status' onclick='"+s+"("+e+", "+t+")'><i class=\""+a+"\"></i></div><div class='title' onclick='buttonOpenElementModalForElementUpdate("+e+", "+t+', "'+d+"\")'>"+o.title+"</div><div class='position'>","open"===n&&(i+="<div class='position-up position-element' onclick='increaseElementPosition("+e+", "+t+")'><i class='fas fa-caret-up'></i></div><div class='position-down position-element' onclick='decreaseElementPosition("+e+", "+t+")'><i class='fas fa-caret-down'></i></div>"),"closed"===n&&(i+="<div class='promote' onclick='prepareModalDelete("+e+", "+t+')\'><i class="fas fa-trash"></i></div></div>'),i+="</div></div>"}function reorderList(s,a,d){$.each(todo,function(e,t){if(e===parseInt(s)){if("up"===d&&0!==a&&1<t.openElements.length){var o=t.openElements[a],n=t.openElements[a-1];t.openElements[a]=n,t.openElements[a-1]=o}if("down"===d&&a!==t.openElements.length-1&&1<t.openElements.length){var i=t.openElements[a],l=t.openElements[a+1];t.openElements[a]=l,t.openElements[a+1]=i}}}),createListsAndElements()}function increaseElementPosition(e,t){reorderList(e,t,"up")}function decreaseElementPosition(e,t){reorderList(e,t,"down")}function changeElementStatus(e,t,o){var n=findElementList(e,"open"),i=findElementList(e,"closed"),l=findElementList(e,"deleted"),s=null;"open"===o&&null!==(s=findElement(e,t,"closed"))&&(i.splice(t,1),n.push(s)),"closed"===o&&(s=findElement(e,t,"open"),n.splice(t,1),i.push(s)),"deleted"===o&&(s=findElement(e,t,"closed"),i.splice(t,1),l.push(s)),createListsAndElements()}function elementStatusToDeleted(e,t){changeElementStatus(e,t,"deleted")}function elementStatusToClosed(e,t){changeElementStatus(e,t,"closed")}function elementStatusToOpen(e,t){changeElementStatus(e,t,"open")}function createNewList(){todo.length<5&&(todo.push({list_name:"New List",openElements:[],closedElements:[],deletedElements:[]}),createListsAndElements())}function findElementList(t,e){var o=null;return"open"===e&&$.each(todo,function(e){e===parseInt(t)&&(o=todo[e].openElements)}),"closed"===e&&$.each(todo,function(e){e===parseInt(t)&&(o=todo[e].closedElements)}),"deleted"===e&&$.each(todo,function(e){e===parseInt(t)&&(o=todo[e].deletedElements)}),o}function findElement(o,n,e){var i=null;return"open"===e&&$.each(todo,function(t,e){t===parseInt(o)&&$.each(e.openElements,function(e){e===parseInt(n)&&(i=todo[t].openElements[e])})}),"closed"===e&&$.each(todo,function(t,e){t===parseInt(o)&&$.each(e.closedElements,function(e){e===parseInt(n)&&(i=todo[t].closedElements[e])})}),"deleted"===e&&$.each(todo,function(t,e){t===parseInt(o)&&$.each(e.closedElements,function(e){e===parseInt(n)&&(i=todo[t].deletedElements[e])})}),i}function findList(t){var o=null;return $.each(todo,function(e){e===parseInt(t)&&(o=todo[e])}),o}function toggleDropdown(e){$("#id-dropdown-"+e).hasClass("hidden")?($(".dropdown").removeClass("flex"),$(".dropdown").addClass("hidden"),$("#id-dropdown-"+e).addClass("flex"),$("#id-dropdown-"+e).removeClass("hidden")):($("#id-dropdown-"+e).removeClass("flex"),$("#id-dropdown-"+e).addClass("hidden"))}function closeAllDropdown(){$(".dropdown").removeClass("flex"),$(".dropdown").addClass("hidden")}function toggleRenameListModal(){$("#id-rename-modal").hasClass("hidden")?($("#id-rename-modal").addClass("flex"),$("#id-rename-modal").removeClass("hidden")):($("#id-rename-modal").removeClass("flex"),$("#id-rename-modal").addClass("hidden"))}function prepareModalRenameList(e){$("#modal-rename-list").val(e),$("#modal-list-rename-input").val(todo[e].list_name),closeAllDropdown(),toggleRenameListModal()}function renameList(){var e=findList($("#modal-rename-list").val()),t=$("#modal-list-rename-input").val();""!==t&&(e.list_name=t,createListsAndElements(),toggleRenameListModal())}function toggleElementModalVisibility(){$("#id-element-modal").hasClass("hidden")?($("#id-element-modal").addClass("flex"),$("#id-element-modal").removeClass("hidden")):($("#id-element-modal").removeClass("flex"),$("#id-element-modal").addClass("hidden"))}function buttonOpenElementModalForElementUpdate(e,t,o){var n=findElement(e,t,o);$("#modal-title").val(n.title),$("#modal-list").val(e),$("#modal-element").val(t),$("#modal-status").val(o),$("#modal-description").val(n.description),$(".button-create").hide(),$(".button-save").show(),closeAllDropdown(),toggleElementModalVisibility()}function buttonOpenElementModalForElementCreate(e){$("#modal-title").val(""),$("#modal-description").val(""),$(".button-create").show(),$(".button-save").hide(),$("#modal-list").val(e),closeAllDropdown(),toggleElementModalVisibility()}function updateElement(){var e=findElement($("#modal-list").val(),$("#modal-element").val(),$("#modal-status").val());e.title=$("#modal-title").val(),e.description=$("#modal-description").val(),toggleElementModalVisibility(),createListsAndElements()}function createNewElement(){var e=$("#modal-list").val(),t=$("#modal-title").val(),o=$("#modal-description").val(),n=findElementList(e,"open");""!==t&&(n.push({title:t,description:o,classification:"OS",user:"Edward Wright",due:"7/4/2019",created:"1/4/2019",checklist:[{name:"checklist Item 1",status:"unchecked"},{name:"checklist Item 2",status:"checked"}]}),toggleElementModalVisibility(),createListsAndElements())}function toggleConfirmationModalVisibility(){$("#id-confirmation-modal").hasClass("hidden")?($("#id-confirmation-modal").addClass("flex"),$("#id-confirmation-modal").removeClass("hidden")):($("#id-confirmation-modal").removeClass("flex"),$("#id-confirmation-modal").addClass("hidden"))}function deleteElement(){elementStatusToDeleted($("#modal-confirm-list").val(),$("#modal-confirm-element").val()),toggleConfirmationModalVisibility()}function prepareModalDelete(e,t){$("#modal-confirm-list").val(e),$("#modal-confirm-element").val(t),$("#deleteElementButton").show(),$("#deleteListButton").hide(),closeAllDropdown(),toggleConfirmationModalVisibility()}function prepareModalDeleteList(e){$("#modal-confirm-list").val(e),$("#deleteElementButton").hide(),$("#deleteListButton").show(),closeAllDropdown(),toggleConfirmationModalVisibility()}function deleteList(){listId=$("#modal-confirm-list").val(),todo.splice(listId,1),createListsAndElements(),toggleConfirmationModalVisibility()}function autoUpdate(){var e=JSON.parse(localStorage.getItem("todo"));null!=localStorage.getItem("todo")?compareJsonArrays(todo,e)||(todo=JSON.parse(localStorage.getItem("todo")),createListsAndElements(),generateUserAlert("It looks like you updated your list on another tab, it has been updated on this tab too!","information",5e3)):firstTimeLoadLocalStorage()}function compareJsonArrays(e,t){if(e===t)return!0;if(!(e instanceof Object&&t instanceof Object))return!1;if(e.constructor!==t.constructor)return!1;for(var o in e)if(e.hasOwnProperty(o)){if(!t.hasOwnProperty(o))return!1;if(e[o]===t[o])continue;if("object"!=typeof e[o])return!1;if(!compareJsonArrays(e[o],t[o]))return!1}for(o in t)if(t.hasOwnProperty(o)&&!e.hasOwnProperty(o))return!1;return!0}function themeChanger(e){"default"===e&&(currentTheme="default",$("body").removeClass(),$("body").addClass("theme-default")),"dark"===e&&(currentTheme="dark",$("body").removeClass(),$("body").addClass("theme-dark")),"light"===e&&(currentTheme="light",$("body").removeClass(),$("body").addClass("theme-light")),saveTheme(e)}function saveTheme(e){localStorage.setItem("theme",e)}function loadTheme(){themeChanger(localStorage.getItem("theme"))}function autoChangeTheme(){null!=localStorage.getItem("theme")?localStorage.getItem("theme")!==currentTheme&&(loadTheme(),generateUserAlert("It looks like you updated your theme on another tab, it has been updated on this tab too!","information",5e3)):setDefaultTheme()}function setDefaultTheme(){null==localStorage.getItem("theme")&&localStorage.setItem("theme","default")}function downloadObjectAsJson(){var e=todo,t="todoBackup_"+(new Date).toISOString(),o="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement("a");n.setAttribute("href",o),n.setAttribute("download",t+".json"),document.body.appendChild(n),n.click(),n.remove()}function generateUserAlert(e,t,o){var n,i="",l="",s="",a=e,d=Math.floor(1e6*Math.random())+0;"information"==t&&(i="fas fa-info-circle",l="Information",s="userAlert-info"),"success"==t&&(i="fas fa-check-circle",l="Success",s="userAlert-success"),"warning"==t&&(i="fas fa-exclamation-circle",l="Warning",s="userAlert-warning"),"error"==t&&(i="fas fa-times-circle",l="Error",s="userAlert-error"),n="<div class='userAlert "+s+"'id='alertId-"+d+"'><div class='icon'><i class='"+i+"'></i></div><div class='text'><div class='text-title'>"+l+"</div><div class='text-body'>"+a+"</div></div></div>",$(".userAlert-container").append(n),0!==o&&setTimeout(function(){$("#alertId-"+d).fadeOut(2e3,function(){$("#alertId-"+d).remove()})},o)}var todoListExample=[{list_name:"Default List",openElements:[{title:"This is an item that is yet to be completed",description:"This is the description for the item that is yet to be completed",classification:"",user:"",due:"",created:"",checklist:[{name:"checklist Item 1",status:"unchecked"}]}],closedElements:[{title:"This is an item that has been completed",description:"This is the description for the item that has been completed",classification:"",user:"",due:"",created:"",checklist:[{name:"checklist Item 1",status:"unchecked"}]}],deletedElements:[]}];firstTimeLoadLocalStorage();var todo=JSON.parse(localStorage.getItem("todo"));createListsAndElements(),autosize($("textarea"));todoListExample=[{list_name:"Default List",openElements:[{title:"This is an item that is yet to be completed",description:"This is the description for the item that is yet to be completed",classification:"",user:"",due:"",created:"",checklist:[{name:"checklist Item 1",status:"unchecked"}]}],closedElements:[{title:"This is an item that has been completed",description:"This is the description for the item that has been completed",classification:"",user:"",due:"",created:"",checklist:[{name:"checklist Item 1",status:"unchecked"}]}],deletedElements:[]}];firstTimeLoadLocalStorage(),window.setInterval(function(){autoUpdate()},1e3);var currentTheme="";setDefaultTheme(),loadTheme(),window.setInterval(function(){autoChangeTheme()},1e3),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").then(function(e){},function(e){console.log("ServiceWorker registration failed: ",e)})});