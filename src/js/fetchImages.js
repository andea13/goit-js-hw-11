import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';

export const searchParams = new URLSearchParams({
  key: '36804541-6df310b69146ced50149f1ae2',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

export async function fetchImages(payload, next) {
  for (let key in payload) {
    searchParams.set(key, payload[key]);
  }
  if (next) {
    searchParams.set('page', +searchParams.get('page') + 1);
  }
  let response = await axios.get(`${BASE_URL}?${searchParams.toString()}`);

  return response.data;
}
