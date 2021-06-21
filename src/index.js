import API from "./js/API-service.js";
import LoadMore from "./js/components/loadMore.js";
import refs from "./js/components/refs.js";
import templateList from "./hbs/listImages.hbs";
import "./scss/style.scss";

const apiSevice = new API();
const loadMoreBtn = new LoadMore("[name='load-more']");

refs.searchForm.addEventListener("submit", onSerach);
loadMoreBtn.refs.button.addEventListener("click", () => {
  const scroll = true;
  fetchAction(scroll);
});

function onSerach(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.query.value;

  apiSevice.query = query;

  apiSevice.resetPage();
  clearListImages();
  loadMoreBtn.show();
  fetchAction();
}

function fetchAction(scroll = false) {
  loadMoreBtn.disable();
  apiSevice
    .fetchAction()
    .then((data) => {
      renderListImages(data);
      loadMoreBtn.enable();
    })
    .finally(() => {
      if (scroll) {
        refs.anchor.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    });
}

function renderListImages(data) {
  const markup = templateList(data);
  refs.listImages.insertAdjacentHTML("beforeend", markup);
}

function clearListImages() {
  refs.listImages.innerHTML = "";
}
