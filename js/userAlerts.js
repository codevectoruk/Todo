function generateUserAlert(inputBody, inputAlertType, lifespan) {
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
  $(".userAlert-container").append(output);

  //var myVar = setTimeout(deleteUserAlert(random), 3000);
  if (lifespan !== 0) {
    setTimeout(function() {
      $("#alertId-" + random).fadeOut(2000, function() {
        $("#alertId-" + random).remove();
      });
    }, lifespan);
  }
}

//user alert demo messages
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "information", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "success", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "warning", 0);
// generateUserAlert("Aww yeah, you successfully read this important alert message.", "error", 0);
