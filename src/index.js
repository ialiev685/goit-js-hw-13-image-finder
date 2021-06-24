import API from "./js/API-service.js";
import LoadMore from "./js/components/loadMore.js";
import refs from "./js/components/refs.js";
import templateList from "./hbs/listImages.hbs";

import "./scss/style.scss";
import "../node_modules/basiclightbox/src/styles/main.scss";
import Modal from "./js/components/modal.js";

const apiSevice = new API();
const loadMoreBtn = new LoadMore("[name='load-more']");

const observer = new IntersectionObserver(observerHandler, { threshold: 1 });
observer.observe(refs.lineTargetEl);

function observerHandler([entries]) {
  if (entries.isIntersecting && apiSevice.query !== "") {
    fetchAction();
  }
}

refs.searchFormEl.addEventListener("submit", onSerach);
loadMoreBtn.refs.button.addEventListener("click", (e) => {
  fetchAction(e.target.name);
});

refs.listImagesEl.addEventListener("click", showModal);

function showModal(e) {
  if (e.target.nodeName !== "IMG") return;
  const dataSrc = e.target.dataset.source;

  const modal = new Modal(dataSrc);
}

function onSerach(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value.trim();

  apiSevice.query = query;
  if (apiSevice.query === "") return;
  apiSevice.resetPage();
  loadMoreBtn.hide();
  clearListImages();
  fetchAction();
}

function fetchAction(nameElement = "") {
  loadMoreBtn.disable();
  apiSevice
    .fetchAction()
    .then((data) => {
      if (data.length !== 0) {
        loadMoreBtn.show();
      }
      renderListImages(data);
      loadMoreBtn.enable();
    })
    .finally(() => {
      if (nameElement === "load-more") {
        refs.anchor.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    });
}

function renderListImages(data) {
  const markup = templateList(data);

  refs.listImagesEl.insertAdjacentHTML("beforeend", markup);
}

function clearListImages() {
  refs.listImagesEl.innerHTML = "";
}
