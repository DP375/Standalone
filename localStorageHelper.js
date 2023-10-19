function updateLocalStorage(todoItems) {
  localStorage.setItem(TODO_STORAGE_KEY, stringifyJson(todoItems));
}

function clearUsersFromLocalStorage(todoItems) {
  localStorage.removeItem(TODO_STORAGE_KEY);
  updateLocalStorage(todoItems);
}

function removeFromLocalStorage(k) {
  localStorage.removeItem(k);
}

function addItemToList(todoItems, itemText) {
  const NEW_ITEM = {
    task: itemText,
    completed: false,
  };
  todoItems.push(NEW_ITEM);
}
