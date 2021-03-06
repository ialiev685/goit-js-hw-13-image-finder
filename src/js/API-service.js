import { messageNotFound, messageError } from "./components/message.js";

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
          messageNotFound("Ничего не найдено!");
        }
        this.incrementPage();
        return hits;
      })
      .catch((error) => {
        console.dir(error);
        messageError(error.message);
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
}
