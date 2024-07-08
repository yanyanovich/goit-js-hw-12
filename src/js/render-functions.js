import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
export function createMarkup(images) {
  const galleryElement = document.querySelector('.gallery');
  galleryElement.innerHTML = '';

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

  galleryElement.innerHTML = markup;
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });
  lightbox.refresh();
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('visible');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visible');
}
