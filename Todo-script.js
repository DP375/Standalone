const POPUP_ERROR = "<div class='error-popup'>";
const POPOUP_TIME = 1500;
const CL_ERROR = "Item not found";
const CHILL = "You have nothing to do";
let todoItems = [];
$(document).ready(() => {
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const ERROR_MESSAGE = "You must enter something on To-do list";
  const CLEAR_LIST_MESSAGE = "List is clear!";
  const TODO_LIST = $(".todo-list");
  const STORED_TODO_LIST = localStorage.getItem("todoList");

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
    .each(function () {
      $(this).append(SPAN_CLOSE);
    });

  $(".todo-list").on("click", ".close", function (event) {
    const PARENT_LI = $(event.currentTarget).closest("li");
    const INDEX = PARENT_LI.index();

    if (INDEX !== -1 < todoItems.length) {
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
    } else {
      // Is this an acceptable action to take?
      showError("Item has been deleted");
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
      const NEW_ITEM = {
        task: INPUT_VALUE,
        completed: false,
      };
      todoItems.push(NEW_ITEM);
    }
    updateLocalStorage(todoItems);
  });

  $("#clearList").click(() => {
    $(".todo-list").empty();
    localStorage.removeItem("todoList");
    showError(CLEAR_LIST_MESSAGE);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
  updateLocalStorage(todoItems);
});
