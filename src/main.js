import iziToast from 'izitoast';

import { fetchImages } from './js/pixabay-api.js';
import { createMarkup, showLoader, hideLoader } from './js/render-functions.js';

const formEl = {
  form: document.querySelector('.form'),
  input: document.querySelector('.search-input'),
};

formEl.form.addEventListener('submit', onsubmit);

function onsubmit(event) {
  event.preventDefault();
  const query = formEl.input.value.trim();

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }
  showLoader();
  fetchImages(query)
    .then(images => {
      hideLoader();
      createMarkup(images);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again!',
      });
    });
  formEl.input.value = '';
}
