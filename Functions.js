function updateLocalStorage(todoItems) {
  localStorage.setItem("todoList", JSON.stringify(todoItems));
}
function clearUsersFromLocalStorage(todoItems) {
  localStorage.removeItem("todoList");
  updateLocalStorage(todoItems);
}
