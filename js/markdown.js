/*jshint esversion: 6 */
function setMarkdownDescription(content) {
  if (content != "") {
    $("#elementDescriptionMarkdownContainer").addClass("flex");
    $("#elementDescriptionMarkdownContainer").removeClass("hidden");
    document.getElementById(
      "elementDescriptionMarkdownBody"
    ).innerHTML = marked(content, { breaks: true });
    highlightMarkdown();
  } else {
    $("#elementDescriptionMarkdownContainer").removeClass("flex");
    $("#elementDescriptionMarkdownContainer").addClass("hidden");
    document.getElementById("elementDescriptionMarkdownBody").innerHTML = "";
    $("#elementDescription").addClass("flex");
    $("#elementDescription").removeClass("hidden");
  }
}

function clickDescriptionMarkdownContainer() {
  $("#elementDescriptionMarkdownContainer").removeClass("flex");
  $("#elementDescriptionMarkdownContainer").addClass("hidden");
  $("#elementDescription").addClass("flex");
  $("#elementDescription").removeClass("hidden");
  autosize.update($("#elementDescription"));
  $("#elementDescription").focus();
}

function loseDescriptionMarkdownContainerFocus() {
  $("#elementDescriptionMarkdownContainer").addClass("flex");
  $("#elementDescriptionMarkdownContainer").removeClass("hidden");

  $("#elementDescription").removeClass("flex");
  $("#elementDescription").addClass("hidden");

  setMarkdownDescription($("#elementDescription").val());
}

function setMarkdownComments(content) {
  if (content != "") {
    $("#elementCommentsMarkdownContainer").addClass("flex");
    $("#elementCommentsMarkdownContainer").removeClass("hidden");
    document.getElementById("elementCommentsMarkdownBody").innerHTML = marked(
      content,
      { breaks: true }
    );
    highlightMarkdown();
  } else {
    $("#elementCommentsMarkdownContainer").removeClass("flex");
    $("#elementCommentsMarkdownContainer").addClass("hidden");
    document.getElementById("elementCommentsMarkdownBody").innerHTML = "";
    $("#elementComments").addClass("flex");
    $("#elementComments").removeClass("hidden");
  }
}

function clickCommentsMarkdownContainer() {
  $("#elementCommentsMarkdownContainer").removeClass("flex");
  $("#elementCommentsMarkdownContainer").addClass("hidden");

  $("#elementComments").addClass("flex");
  $("#elementComments").removeClass("hidden");
  autosize.update($("#elementComments"));
  $("#elementComments").focus();
}

function loseCommentsMarkdownContainerFocus() {
  $("#elementCommentsMarkdownContainer").addClass("flex");
  $("#elementCommentsMarkdownContainer").removeClass("hidden");

  $("#elementComments").removeClass("flex");
  $("#elementComments").addClass("hidden");

  setMarkdownComments($("#elementComments").val());
}

function highlightMarkdown() {
  document.querySelectorAll("pre code").forEach(block => {
    hljs.highlightBlock(block);
  });
}
