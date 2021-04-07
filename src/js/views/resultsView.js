import View from './View.js';
import previewView from './previewView';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipes were found for your query. Please try again!`;
  _successMessage = ``;

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join(' ');
  }
}

export default new ResultsView();
