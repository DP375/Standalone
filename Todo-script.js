$(document).ready(() => {
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";
  const CLEAR_LIST_MESSAGE = "List is clear!";
  const TODO_LIST = $(".todo-list");

  const STORED_TODO_LIST = localStorage.getItem("todoList");
  todoItems = [];
  if (STORED_TODO_LIST) {
    todoItems = JSON.parse(STORED_TODO_LIST);

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
    const PARENT_li = $(event.currentTarget).parent();
    const INDEX = PARENT_li.index();
    if (INDEX !== -1) {
      todoItems.splice(INDEX, 1);
      PARENT_li.remove();
      updateLocalStorage(todoItems);
    } else {
      console.error("Index not found.");
    }
  });

  $(".todo-list").on("click", "li", (event) => {
    const CLICKED_ITEM = $(event.currentTarget);
    const INDEX = $(".todo-list").find("li").index(CLICKED_ITEM);
    if (INDEX !== -1 && INDEX < todoItems.length) {
      todoItems[INDEX].completed = !todoItems[INDEX].completed;
      CLICKED_ITEM.toggleClass("checked");
      updateLocalStorage(todoItems);
    } else {
      console.error(
        "Invalid index or the item has been deleted or does not exist."
      );
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

  function showError(message);

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
