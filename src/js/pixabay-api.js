import axios from 'axios';

const API_KEY = '44768400-50ed818a42c4b3c7dfabdf0f1';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: perPage,
    },
  });
  if (response.status !== 200) {
    throw new Error(response.status);
  }
  return response.data;
}
