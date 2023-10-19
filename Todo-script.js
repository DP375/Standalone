const TODO_STORAGE_KEY = "todoList";
const POPUP_ERROR = "<div class='error-popup'>";
const POPOUP_TIME = 1500;
const CL_ERROR = "Item not found";
const CHILL = "You have nothing to do";
const ERROR_MESSAGE = "You must enter something on To-do list";
const CLEAR_LIST_MESSAGE = "List is clear!";
let todoItems = [];
$(document).ready(() => {
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const TODO_LIST = $(".todo-list");
  const STORED_TODO_LIST = localStorage.getItem(TODO_STORAGE_KEY);

  if (!STORED_TODO_LIST) {
    showError(CHILL);
  } else {
    todoItems = parseJson(STORED_TODO_LIST);

    for (const item of todoItems) {
      const LIST_ITEM = $("<li>").text(item.task).append(SPAN_CLOSE);
      if (item.completed) {
        LIST_ITEM.addClass("checked");
      }
      TODO_LIST.append(LIST_ITEM);
    }
  }

  $(".todo-list")
    .find("li")
    .each((index, element) => $(element).append(SPAN_CLOSE));

  $(".todo-list").on("click", ".close", function (event) {
    const PARENT_LI = $(event.currentTarget).closest("li");
    const INDEX = PARENT_LI.index();

    if (INDEX !== -1 && INDEX < todoItems.length) {
      todoItems.splice(INDEX, 1);
      PARENT_LI.remove();

      updateLocalStorage(todoItems);
    } else {
      showError(CL_ERROR);
    }
  });

  $(".todo-list").on("click", "li", (event) => {
    const CLICKED_ITEM = $(event.currentTarget);
    const INDEX = $(".todo-list").find("li").index(CLICKED_ITEM);
    if (INDEX !== -1) {
      todoItems[INDEX].completed = !todoItems[INDEX].completed;
      CLICKED_ITEM.toggleClass("checked");
      updateLocalStorage(todoItems);
    }
  });

  $(".add-btn").click(() => {
    const INPUT_VALUE = $("#userInput").val();
    if (!INPUT_VALUE) {
      showError(ERROR_MESSAGE);
    } else {
      var listItem = $("<li>").text(INPUT_VALUE).append(SPAN_CLOSE);
      $(".todo-list").append(listItem);
      $("#userInput").val("");
      addItemToList(todoItems, INPUT_VALUE);
    }
    updateLocalStorage(todoItems);
  });

  $("#clearList").click(() => {
    $(".todo-list").empty();
    removeFromLocalStorage(TODO_STORAGE_KEY);
    showError(CLEAR_LIST_MESSAGE);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
  updateLocalStorage(todoItems);
});
