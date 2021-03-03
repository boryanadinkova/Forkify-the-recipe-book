import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.generateErrorMessage();

    this._data = data;

    // render to browser
    const html = this._generateMarkup();

    if (!render) return html;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  update(data) {
    this._data = data;

    // render to browser
    const newHTML = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newHTML);
    const newElements = [...newDOM.querySelectorAll('*')];
    const currElements = [...this._parentEl.querySelectorAll('*')];

    newElements.forEach((newEl, newI) => {
      const currEl = currElements[newI];

      // Updates Changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      // Updates Changed attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }

  generateErrorMessage(message = this._errorMessage) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', html);
  }

  generateSuccessMessage(message = this._successMessage) {
    const html = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', html);
  }
}
