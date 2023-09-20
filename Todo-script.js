window.onload = function () {
  // Dodajte svoj kod koji želite da se izvrši nakon učitavanja stranice ovdje
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";

  var user_input = $("#userInput");

  // Ciljanje <ul> preko klase "todo-list"
  var todoList = $(".todo-list");
  $("li").each(function () {
    $(this).append(SPAN_CLOSE);
  });

  // Klik na "close" dugme skriva trenutnu stavku
  todoList.on("click", ".close", function () {
    $(this).parent().css("display", "none");
  });

  // Klik na stavku označava je kao "checked"
  todoList.on("click", "li", function () {
    $(this).toggleClass("checked");
  });

  // Dodavanje nove stavke na listu
  $(".add-btn").click(function () {
    var inputValue = user_input.val();
    if (!inputValue) {
      showError(ERROR_MESSAGE);
    } else {
      var listItem = $("<li>").text(inputValue).append(SPAN_CLOSE);
       $(".todo-list").append(listItem);
      user_input.val("");
    }
  });

  function showError(message) {
    const ERROR_POPUP = $(POPUP_ERROR).text(message);
    $("body").append(ERROR_POPUP);

    setTimeout(function () {
      ERROR_POPUP.fadeOut(function () {
        $(this).remove();
      });
    }, POPOUP_TIME);
  }

  $("#clearList").click(function () {
    todoList.empty();
  });
};
