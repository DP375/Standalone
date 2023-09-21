$(document).ready(() => {
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";

  const todoList = $(".todo-list");
  todoList.find("li").each((element) => $(element).append(SPAN_CLOSE));

  todoList.on("click", ".close", (event) => {
    $(event.currentTarget).parent().toggle();
  });

  todoList.on("click", "li", (event) => {
    $(event.currentTarget).toggleClass("checked");
  });

  $(".add-btn").click(() => {
    const INPUT_VALUE = $("#userInput").val();
    if (!INPUT_VALUE) {
      showError(ERROR_MESSAGE);
    } else {
      var listItem = $("<li>").text(INPUT_VALUE).append(SPAN_CLOSE);
      $(".todo-list").append(listItem);
      $("#userInput").val("");
    }
  });

  function showError(message) {
    const ERROR_POPUP = $(POPUP_ERROR).text(message);
    $("body").append(ERROR_POPUP);

    setTimeout(() => {
      ERROR_POPUP.fadeOut(() => {
        $(this).remove();
      });
    }, POPOUP_TIME);
  }

  $("#clearList").click(() => {
    todoList.empty();
  });
});
