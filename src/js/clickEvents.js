$(".modal-container").on("click", function(e) {
  if (e.target !== this) return;
  closeAllModals();
});

$(document).click(function() {
  //do something
  closeAllDropdown();
});
