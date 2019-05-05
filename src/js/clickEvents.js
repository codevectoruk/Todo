$(".modal-container").on("click", function(e) {
  if (e.target !== this) return;
  closeAllModals();
});

$(document).click(function() {
  closeAllDropdown();
});

$(".dropdown").click(function(e) {
  e.stopPropagation();
});

$(".list-button").click(function(e) {
  e.stopPropagation();
});
