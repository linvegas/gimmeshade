/** @param { string } selector */
export const qSel = (selector) => {
  return document.querySelector(selector);
};

/** @param { string } selector */
export const qAll = (selector) => {
  return document.querySelectorAll(selector);
};
