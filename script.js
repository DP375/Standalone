
// Dodavanje "close" dugmeta za svaku stavku liste
$("li").each(function() {
  $(this).append("<span class='close'>\u00D7</span>");
});

// Klik na "close" dugme skriva trenutnu stavku
$("ul").on("click", ".close", function() {
  $(this).parent().css("display", "none");
});

// Klik na stavku označava je kao "checked"
$("ul").on("click", "li", function() {
  $(this).toggleClass("checked");
});

// Dodavanje nove stavke na listu
$(".addBtn").click(function() {
  var inputValue = $("#myInput").val();
  if (inputValue === '') {
    alert("moras napisati nesto");
  } else {
    $("#myUL").append("<li>" + inputValue + "<span class='close'>\u00D7</span></li>");
    $("#myInput").val("");
  }
});
$("#clearList").click(function() {
  // Koristi jQuery za brisanje svih <li> elemenata unutar <ul> elementa
  $("#myUL").empty();
});