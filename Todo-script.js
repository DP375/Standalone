// Dodavanje "close" dugmeta za svaku stavku liste
const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
var variable = $("#userInput");

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
  var inputValue = variable.val();
  if (!inputValue) {
    showError("You must enter something on To-do list.");
  } else {
    var listItem = $("<li>").text(inputValue).append(SPAN_CLOSE);
    todoList.append(listItem);
    variable.val("");
  }
});

function showError(message) {
  const errorPopup = $("<div class='error-popup'>").text(message);
  $("body").append(errorPopup);

  setTimeout(function () {
    errorPopup.fadeOut(function () {
      $(this).remove();
    });
  }, 1500);
}

$("#clearList").click(function () {
  todoList.empty();
});
