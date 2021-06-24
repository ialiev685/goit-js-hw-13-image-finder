import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/Material.css";
import { alert, notice, info, success, error, Stack } from "@pnotify/core";

const myStack = new Stack({
  dir1: "down",
  dir2: "left",
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  positioned: false,
  push: "bottom",
  context: document.querySelector(".container"),
});

function messageNotFound(text) {
  alert({
    text: text,
    delay: 500,
    closer: false,
    sticker: false,
    addClass: "pnotify-center",
    width: "auto",
    stack: myStack,
  });
}
function messageError(text) {
  error({
    text: text,
    delay: 500,
    closer: false,
    sticker: false,
    addClass: "pnotify-center",
    width: "auto",
    stack: myStack,
  });
}

export { messageNotFound, messageError };
