export default class LoadMore {
  constructor(selector) {
    this.refs = this.getRefs(selector);
    this.hide();
  }
  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }
  hide() {
    this.refs.button.classList.add("is-hidden");
  }
  show() {
    this.refs.button.classList.remove("is-hidden");
  }
  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = "показать еще";
  }
  disable() {
    this.refs.button.disabled = true;
    this.refs.button.textContent = "Загружаю...";
  }
}
