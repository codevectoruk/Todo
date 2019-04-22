function timeTill(futureDate) {
    var dateFuture = Date.parse(futureDate);
    var dateNow = new Date();

    var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    var output = "";
    if (dateFuture - dateNow <= 0) {
        output = "Due!";
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
