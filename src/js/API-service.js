import { alert, notice, info, success, error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/Material.css";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "22163812-fdf68a623e9a64649f570bea3";

export default class API {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }

  fetchAction() {
    const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12`;

    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          this.messageNotFound("Ничего не найдено!");
        }
        this.incrementPage();
        return hits;
      })
      .catch((error) => {
        this.messageError(error.message);
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(value) {
    this.searchQuery = value;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  messageNotFound(text) {
    const myInfo = notice({
      text: text,
      delay: 5000,
      closer: false,
      sticker: false,
      addClass: "pnotify-center",
    });
  }
  messageError(text) {
    const myInfo = error({
      text: text,
      delay: 250,
      closer: false,
      sticker: false,
    });
  }
}
