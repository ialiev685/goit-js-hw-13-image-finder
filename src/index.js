import API from "./js/API-service.js";
import LoadMore from "./js/components/loadMore.js";
import refs from "./js/components/refs.js";
import templateList from "./hbs/listImages.hbs";
import "./scss/style.scss";
import "./js/components/modal.js";

const apiSevice = new API();
const loadMoreBtn = new LoadMore("[name='load-more']");

const options = {
  rootMargin: "50px",
  threshold: 1,
};

function onEntry(entries, observer) {
  console.log(entries[0].isIntersecting);
  if (entries[0].isIntersecting) {
    fetchAction();
  }
}

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.lineTarget);

refs.searchForm.addEventListener("submit", onSerach);
loadMoreBtn.refs.button.addEventListener("click", (e) => {
  fetchAction(e.target.name);
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

function fetchAction(nameElement = "") {
  loadMoreBtn.disable();
  apiSevice
    .fetchAction()
    .then((data) => {
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

  refs.listImages.insertAdjacentHTML("beforeend", markup);
}

function clearListImages() {
  refs.listImages.innerHTML = "";
}
