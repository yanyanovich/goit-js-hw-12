import iziToast from 'izitoast';

import { fetchImages } from './js/pixabay-api.js';
import {
  createMarkup,
  showLoader,
  hideLoader,
  clearSearchInput,
  toggleLoadMoreBtn,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
const perPage = 15;

const formEl = {
  form: document.querySelector('.form'),
  input: document.querySelector('.search-input'),
  loadMoreButton: document.querySelector('#load-more-btn'),
};
formEl.form.addEventListener('submit', onsubmit);
formEl.loadMoreButton.addEventListener('click', loadMoreImages);

async function onsubmit(event) {
  event.preventDefault();
  const query = formEl.input.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  showLoader();
  toggleLoadMoreBtn(false);

  try {
    const { hits, totalHits } = await fetchImages(
      currentQuery,
      currentPage,
      perPage
    );
    createMarkup(hits, true);
    toggleLoadMoreBtn(hits.length >= perPage);
    clearSearchInput();
    if (totalHits <= perPage) {
      toggleLoadMoreBtn(false);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  currentPage += 1;
  showLoader();

  try {
    const { hits, totalHits } = await fetchImages(
      currentQuery,
      currentPage,
      perPage
    );
    createMarkup(hits, false);
    const loadedImages = currentPage * perPage;
    toggleLoadMoreBtn(loadedImages < totalHits);
    if (loadedImages >= totalHits) {
      toggleLoadMoreBtn(false);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
}
