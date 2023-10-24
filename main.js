import { qSel, qAll } from "./utils";

const APP = document.querySelector("main#main");

/** @param {string} color
 *  @param {number} percent
 *  @returns {string}
 *  */
function colorShades(color, percent) {
  let red = parseInt(color.substring(1, 3), 16);
  let green = parseInt(color.substring(3, 5), 16);
  let blue = parseInt(color.substring(5, 7), 16);

  red = parseInt((red * (100 + percent)) / 100);
  green = parseInt((green * (100 + percent)) / 100);
  blue = parseInt((blue * (100 + percent)) / 100);

  red = Math.round(red < 255 ? red : 255);
  green = Math.round(green < 255 ? green : 255);
  blue = Math.round(blue < 255 ? blue : 255);

  let RR =
    red.toString(16).length === 1 ? "0" + red.toString(16) : red.toString(16);
  let GG =
    green.toString(16).length === 1
      ? "0" + green.toString(16)
      : green.toString(16);
  let BB =
    blue.toString(16).length === 1
      ? "0" + blue.toString(16)
      : blue.toString(16);

  return "#" + RR + GG + BB;
}

function handlePannelClick(event) {
  let colorhex = event.target.innerText;
  navigator.clipboard.writeText(colorhex).then(() => {
    suddenNotify(`${colorhex} copied!`);
  });
}

function createPannel(color) {
  let pannel = document.createElement("div");
  let text = document.createTextNode(color);
  // let spanText = document.createElement("span");
  pannel.setAttribute("class", "pannel");
  pannel.style.background = color;
  // spanText.appendChild(text);
  // pannel.appendChild(spanText);
  pannel.appendChild(text);
  return pannel;
}

/** @param {string} color
 *  @param {number} amount
 *  @returns {string[]}
 *  */
function generateShadeList(color, amount = 8) {
  let colorList = [];

  // Ligh shades
  for (let i = 0; i < amount; i++) {
    let hex = colorShades(color, i * 10);
    colorList.push(hex);
  }

  // Dark shades
  for (let i = 1; i < amount; i++) {
    let hex = colorShades(color, i * -10);
    colorList.unshift(hex);
  }

  return colorList;
}

/** @param {string[]} colorlist
 *  @returns {void}
 *  */
function generateShadePannels(colorlist) {
  let prevPannel = document.querySelector("div.pannel");
  if (document.body.contains(prevPannel)) {
    qAll("div.pannel").forEach((pannel) => pannel.remove());
  }

  colorlist.forEach((color) => {
    let newPannel = createPannel(color);
    APP.appendChild(newPannel);
  });

  const pannels = document.querySelectorAll(".pannel");

  pannels.forEach((pannel) => {
    pannel.addEventListener("click", handlePannelClick);
  });
}

/** @param {string} notification
 *  @returns {void}
 *  */
function suddenNotify(notification) {
  /** @type {HTMLDialogElement} prevDialog */
  let prevDialog = document.querySelector("dialog");
  if (document.body.contains(prevDialog)) {
    prevDialog.close();
    prevDialog.remove();
  }

  /** @type {HTMLDialogElement} dialog */
  let dialog = document.createElement("dialog");

  let notif = document.createTextNode(notification);
  dialog.setAttribute("open", "true");
  dialog.appendChild(notif);
  APP.appendChild(dialog);
  setTimeout(() => {
    dialog.close();
    dialog.remove();
  }, 2000);
}

function handleGenShades() {
  const colorInput = document.querySelector('input[name="color"]');
  const amountInput = document.querySelector('input[name="amount"]');
  let newColor = colorInput.value;
  let newAmount = amountInput.value;
  let colors = generateShadeList(newColor, newAmount);
  generateShadePannels(colors);
}

function handleGenCss() {
  const colorInput = document.querySelector('input[name="color"]');
  const amountInput = document.querySelector('input[name="amount"]');
  let newColor = colorInput.value;
  let newAmount = amountInput.value;
  let colors = generateShadeList(newColor, newAmount);
  let cssBlock = "";
  colors.forEach((color, index) => {
    cssBlock += `  --color-${index}: ${color}\n`;
  });
  console.log(cssBlock);
  navigator.clipboard.writeText(cssBlock).then(() => {
    suddenNotify(`CSS code block copied!`);
  });
}

function main() {
  const genBtn = qSel("button.menu-generate-btn");
  genBtn.addEventListener("click", handleGenShades);

  const cssBtn = qSel("button.menu-css-btn");
  cssBtn.addEventListener("click", handleGenCss);

  generateShadePannels(generateShadeList("#c778dd"));
}

window.onload = () => {
  main();
};
