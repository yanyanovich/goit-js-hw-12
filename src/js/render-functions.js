import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
export function createMarkup(images, isNewSearch = true) {
  const galleryElement = document.querySelector('.gallery');
  if (isNewSearch) galleryElement.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}" class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b> ${image.likes}</p>
            <p class="info-item"><b>Views</b> ${image.views}</p>
            <p class="info-item"><b>Comments</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
          </div>
        </a>
    </li>
  `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
  lightbox.refresh();

  if (!isNewSearch) {
    smoothScroll();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('visible');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
}

export function clearSearchInput() {
  const input = document.querySelector('#search-input');
  input.value = '';
}

export function toggleLoadMoreBtn(shouldShow) {
  const loadMoreBtn = document.querySelector('#load-more-btn');
  if (shouldShow) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}
