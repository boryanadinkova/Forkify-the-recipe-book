import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _numPages;
  _curPage;

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const { goToPage } = btn.dataset;
      handler(+goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and no other pages
    if (this._curPage === 1 && this._numPages === 1) return '';
    // Page of multiple pages
    return this._generatePageOfMultiple(this._curPage);
  }

  _generatePageOfMultiple(curPage) {
    const firstPage = `
    <button data-go-to-page="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    const lastPage = `
    <button data-go-to-page="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;

    // Page 1 and there are other pages
    if (curPage === 1 && this._numPages > 1) return firstPage;
    // Last page
    if (curPage === this._numPages) return lastPage;
    // Any other page
    return `${firstPage} ${lastPage}`;
  }
}

export default new PaginationView();
