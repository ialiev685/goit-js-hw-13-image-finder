import * as basicLightbox from "basiclightbox";

export default class Modal {
  constructor(dataSrc) {
    this.modalEl = this.createModal(dataSrc);
  }

  createModal(dataSrc) {
    const template = `<img src='${dataSrc}' width="800" height="600">`;
    return basicLightbox
      .create(template, {
        closable: true,
        className: "modal",
        onShow: (obj) => {
          window.addEventListener("keydown", function handler(e) {
            if (e.code === "Escape") {
              obj.close();
              window.removeEventListener("keydown", handler);
            }
          });
        },
      })
      .show();
  }
}
