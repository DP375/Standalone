// Dodavanje "close" dugmeta za svaku stavku liste
const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
var promenjiva = $("#myInput");

$("li").each(function () {
  $(this).append(SPAN_CLOSE);
});

// Klik na "close" dugme skriva trenutnu stavku
$("ul").on("click", ".close", function () {
  $(this).parent().css("display", "none");
});

// Klik na stavku označava je kao "checked"
$("ul").on("click", "li", function () {
  $(this).toggleClass("checked");
});

// Dodavanje nove stavke na listu
$(".add-btn").click(function () {
  var inputValue = promenjiva.val();
  if (inputValue === "") {
    showError("You must enter something on To-do list.");
  } else {
    var listItem = $("<li>").text(inputValue).append(SPAN_CLOSE);
    $("#myUL").append(listItem);
    promenjiva.val("");
  }
});

function showError(message) {
  const errorPopup = $("<div class='error-popup'>").text(message);
  $("body").append(errorPopup);

  setTimeout(function () {
    errorPopup.fadeOut(function () {
      $(this).remove();
    });
  }, 1500); // Poruka će nestati nakon 1 sekunde (1000ms)
}
$("#clearList").click(function () {
  // Koristi jQuery za brisanje svih <li> elemenata unutar <ul> elementa
  $("#myUL").empty();
});
