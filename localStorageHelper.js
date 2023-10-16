function updateLocalStorage(todoItems) {
  localStorage.setItem("todoList", stringifyJson(todoItems));
}

function clearUsersFromLocalStorage(todoItems) {
  localStorage.removeItem("todoList");
  updateLocalStorage(todoItems);
}

function showError(message) {
  const ERROR_POPUP = $(POPUP_ERROR).text(message);
  $("body").append(ERROR_POPUP);
  setTimeout(() => {
    ERROR_POPUP.fadeOut(() => {
      $(this).remove();
    });
  }, POPOUP_TIME);
}
