$(document).ready(() => {
  // Dodajte svoj kod koji želite da se izvrši nakon učitavanja stranice ovdje
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";
  const USER_INPUT = $("#userInput");

  // Ciljanje <ul> preko klase "todo-list"
  const todoList = $(".todo-list");
  $(".todoList li").each((element) => $(element).append(SPAN_CLOSE));

  //ili
  //todoList.find("li").each((element) => $(element).append(SPAN_CLOSE));

  // Klik na "close" dugme skriva trenutnu stavku
  todoList.on("click", ".close", function () {
    $(this).parent().css("display", "none");
  });
  // todoList.on("click", ".close", () => {
  //   $(event.currentTarget).parent().toggle();
  // });

  // Klik na stavku označava je kao "checked"
  todoList.on("click", "li", function () {
    $(this).toggleClass("checked");
  });
  // todoList.on("click", "li", () => {
  //   $(event.currentTarget).toggleClass("checked");
  // });

  // Dodavanje nove stavke na listu
  $(".add-btn").click(() => {
    const INPUT_VALUE = USER_INPUT.val();
    if (!INPUT_VALUE) {
      showError(ERROR_MESSAGE);
    } else {
      var listItem = $("<li>").text(INPUT_VALUE).append(SPAN_CLOSE);
      $(".todo-list").append(listItem);
      USER_INPUT.val("");
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
