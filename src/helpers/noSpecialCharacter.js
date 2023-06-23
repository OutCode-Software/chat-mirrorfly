export const noSpecialCharacters = (text) => {
  return text.replace(/[^a-zA-Z0-9 ]/g, "");
};
