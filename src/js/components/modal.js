import * as basicLightbox from "basiclightbox";
import refs from "./refs.js";

refs.listImages.addEventListener("click", makeTagImg);

function makeTagImg(e) {
  if (e.target.nodeName === "IMG") {
    const imgTag = `<img src='${e.target.dataset.source}' width="800" height="600">`;
    showModal(imgTag);
  }
}

function showModal(imgTag) {
  const modal = basicLightbox.create(imgTag, {
    closable: true,
    className: "modal",
    onShow: () => {
      window.addEventListener("keydown", onCloseModal.bind(modal));
    },
  });

  modal.show();
}

function onCloseModal(e) {
  if (e.code === "Escape") this.close();
}
