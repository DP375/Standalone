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
