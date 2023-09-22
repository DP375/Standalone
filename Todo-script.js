$(document).ready(() => {
  // $("li:eq(2)") // Ovo će izabrati treći <li> element (indeks 2)

  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";
  const CLEAR_LIST_MESSAGE = "List is clear!";

  const TODO_LIST = $(".todo-list");
  const ADD_BTN = $(".add-btn");
  const CLEAR_LIST_BTN = $("#clearList");

  // Funkcija za ažuriranje Local Storage
  // function updateLocalStorage() {
  //   localStorage.setItem("todoList", JSON.stringify(todoItems));
  // }
  function updateLocalStorage() {
    const storageData = {};
    for (const item of todoItems) {
      storageData[item.task] = item.completed;
    }
    localStorage.setItem("todoList", JSON.stringify(storageData));
  }

  // Funkcija za prikazivanje poruke o grešci
  function showError(message) {
    const ERROR_POPUP = $(POPUP_ERROR).text(message);
    $("body").append(ERROR_POPUP);

    setTimeout(() => {
      ERROR_POPUP.fadeOut(() => {
        $(this).remove();
      });
    }, POPOUP_TIME);
  }

  // DODAJEM NOVU STAVKU
  function addNewItem(TASK_TEXT) {
    const NEW_ITEM = {
      task: TASK_TEXT,
      completed: false,
    };
    todoItems.push(NEW_ITEM);
    const LIST_ITEM = $("<li>").text(TASK_TEXT).append(SPAN_CLOSE);
    TODO_LIST.append(LIST_ITEM);
    $("#userInput").val("");
    updateLocalStorage();
  }

  // daj AKO IMA STA todo u Local Storage
  const STORED_TODO_LIST = localStorage.getItem("todoList");
  let todoItems = [];
  if (STORED_TODO_LIST) {
    todoItems = JSON.parse(STORED_TODO_LIST);
    // Prikazivanje postojećih stavki iz Local Storage
    for (const ITEM of todoItems) {
      const LIST_ITEM = $("<li>").text(ITEM.task).append(SPAN_CLOSE);

      // "checked"
      if (ITEM.completed) {
        LIST_ITEM.addClass("checked");
      }
      TODO_LIST.append(LIST_ITEM);
    }
  }

  // Označavanje stavke kao "checked" i ažuriranje Local Storage-a
  TODO_LIST.on("click", "li", (event) => {
    const LIST_ITEM = $(event.currentTarget);
    LIST_ITEM.toggleClass("checked"); // Dodajemo/uklanjamo klasu "checked"
    console.log(`Item clicked: ${LIST_ITEM.text()}`);

    // Ažuriramo Local Storage za ovu stavku
    const TASK_TEXT2 = LIST_ITEM.text();
    const INDEX = todoItems.findIndex((item) => item.task === TASK_TEXT2);
    if (INDEX !== -1) {
      todoItems[INDEX].completed = LIST_ITEM.hasClass("checked");
      // console.log(`Updated status for item: ${TASK_TEXT2}, completed: ${todoItems[INDEX].completed}`);
      updateLocalStorage();
    }
  });

  // Funkcija za brisanje stavke
  TODO_LIST.on("click", ".close", (event) => {
    $(event.currentTarget).parent().toggle();

    updateLocalStorage();
  });

  // Dodavanje nove stavke na klik dugmeta "Add"
  ADD_BTN.click(() => {
    const INPUT_VALUE = $("#userInput").val();
    if (!INPUT_VALUE) {
      showError(ERROR_MESSAGE);
    } else {
      addNewItem(INPUT_VALUE);
      //ovde bih dodao da prebaci completed value true
    }
  });

  // Funkcija za brisanje cele liste kada korisnik klikne na dugme "Clear List"
  CLEAR_LIST_BTN.click(() => {
    TODO_LIST.empty(); // Očistimo celu listu
    // Očistimo Local Storage
    localStorage.removeItem("todoList");
    showError(CLEAR_LIST_MESSAGE); // Prikazujemo poruku
  });
});
