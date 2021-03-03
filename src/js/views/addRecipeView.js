import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeViewView extends View {
  _parentEl = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addShowWindowHandler();
    this._addHideWindowHandler();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addShowWindowHandler() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHideWindowHandler() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addUploadHendler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataEntriesArr = [...new FormData(this)];
      const data = Object.fromEntries(dataEntriesArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeViewView();
