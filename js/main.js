import "@fortawesome/fontawesome-free/css/all.css";
import "highlight.js";

import jquery from "../js-lib/jquery-3.4.0.min";

export default window.$ = window.jQuery = jquery;

window.version = 213; //update this to reflect the latest version of the todo
window.devStatus = "production"; //use production or development for the status of the build
window.todo = JSON.parse(localStorage.getItem("todo"));
window.elementCreateFlag = false;
window.currentTheme = "";

import autosize from "../js-lib/autosize.min";
import "../js-lib/marked";

import {
  firstTimeLoadLocalStorage,
  autoUpdate,
  createListsAndElements,
  setDefaultTheme,
  loadTheme,
  themeChanger,
  autoChangeTheme,
  compareElementModalTextarea,
  checkVersion,
  closeAllModals,
  closeAllDropdown,
  registerDropdownClickInterrupts,
  buttonOpenElementModalForElementUpdate,
} from "./functions.js";

firstTimeLoadLocalStorage();

autosize($("#elementDescription"));
autosize($("#elementComments"));

$("#elementDescription").focus(function () {
  autosize.update($("#elementDescription"));
  autosize.update($("#elementComments"));
});

// every 5 seconds second check for the list being updated on another tab
window.setInterval(function () {
  autoUpdate();
}, 5000);

// auto update the lists and elements one a minute
window.setInterval(function () {
  createListsAndElements();
}, 60000);

window.setInterval(function () {
  if (
    $(".list-container").get(0).scrollWidth >
    $(".list-container").get(0).clientWidth
  ) {
    $(".footer-container").addClass("hidden");
    $(".footer-container").removeClass("flex");
  } else {
    $(".footer-container").removeClass("hidden");
    $(".footer-container").addClass("flex");
  }
}, 500);



setDefaultTheme();
loadTheme();

//check every 5 seconds for the theme being changed on another tab
window.setInterval(function () {
  autoChangeTheme();
}, 5000);

$(document).on("keyup", function (e) {
  if ($("#elementDescription").is(":visible")) {
    compareElementModalTextarea();
  }
});

checkVersion();

/*jshint esversion: 6 */

$(".modal-container").on("click", function (e) {
  if (e.target !== this) return;
  closeAllModals();
});

$(document).click(function () {
  closeAllDropdown();
});

registerDropdownClickInterrupts();

var globalListenToDrag = false;

$(".footer").append(" v." + version);
