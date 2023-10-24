/** @param { string } selector
 *  @returns {Element} */
export const qSel = (selector) => {
  return document.querySelector(selector);
};

/** @param { string } selector
 *  @returns {Element} */
export const qAll = (selector) => {
  return document.querySelectorAll(selector);
};
