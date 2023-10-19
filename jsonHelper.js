const STRINGIFY_MESSAGE = "Error while converting";
const PARSE_MESSAGE = "Error while interpreting";

function stringifyJson(x) {
  try {
    return JSON.stringify(x);
  } catch (error) {
    showError(STRINGIFY_MESSAGE);
  }
}

function parseJson(z) {
  try {
    return JSON.parse(z);
  } catch (error) {
    showError(PARSE_MESSAGE);
  }
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
