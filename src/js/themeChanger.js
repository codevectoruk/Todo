var currentTheme = "";

function themeChanger(theme) {
    if(theme === "default") {
        currentTheme = "default";
        $("body").removeClass();
        $("body").addClass("theme-default");
    }
    if(theme === "dark") {
        currentTheme = "dark";
        $("body").removeClass();
        $("body").addClass("theme-dark");
    }
    if(theme === "light") {
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
    if(localStorage.getItem("theme") != null){
        if(localStorage.getItem("theme") !==  currentTheme){
            loadTheme();
        }
    } else {
        setDefaultTheme();
    }
}

function setDefaultTheme() {
    if(localStorage.getItem("theme") == null) {
        localStorage.setItem("theme", "default");
    }
}

setDefaultTheme();
loadTheme();

window.setInterval(function(){
    autoChangeTheme();
}, 1000);
