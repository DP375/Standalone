$(document).ready(() => {
  const SPAN_CLOSE = "<span class='close'>\u00D7</span>";
  const POPOUP_TIME = 1500;
  const POPUP_ERROR = "<div class='error-popup'>";
  const ERROR_MESSAGE = "You must enter something on To-do list";
  const CLEAR_LIST_MESSAGE = "List is clear!";
  const TODO_LIST = $(".todo-list");

  const storedTodoList = localStorage.getItem("todoList");
  todoItems = [];
  if (storedTodoList) {
    todoItems = JSON.parse(storedTodoList);

    for (const item of todoItems) {
      const listItem = $("<li>").text(item.task).append(SPAN_CLOSE);
      if (item.completed) {
        listItem.addClass("checked");
      }
      TODO_LIST.append(listItem);
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
    const clickedItem = $(event.currentTarget);
    const index = $(".todo-list").find("li").index(clickedItem);
    if (index !== -1 && index < todoItems.length) {
      todoItems[index].completed = !todoItems[index].completed;
      clickedItem.toggleClass("checked");
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
      const newItem = {
        task: INPUT_VALUE,
        completed: false,
      };
      todoItems.push(newItem);
    }
    updateLocalStorage(todoItems);
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
    $(".todo-list").empty();
    localStorage.removeItem("todoList");
    showError(CLEAR_LIST_MESSAGE);
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
  updateLocalStorage(todoItems);
});
