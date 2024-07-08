const API_KEY = '44768400-50ed818a42c4b3c7dfabdf0f1';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then(data => data.hits);
}
