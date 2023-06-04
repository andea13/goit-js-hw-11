import axios from 'axios';
import refs from './refs';

export const BASE_URL = 'https://pixabay.com/api';

export const searchParams = new URLSearchParams({
  key: '36804541-6df310b69146ced50149f1ae2',
  imageType: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

export async function getFirstPage() {
  let q = refs.inputEl.value;
  if (q.trim() === '') {
    return;
  }
  searchParams.set('q', q);
  searchParams.set('page', 1);

  let firstPageResponse = await axios.get(
    `${BASE_URL}?${searchParams.toString()}`
  );
  console.log(firstPageResponse);
  return firstPageResponse;
}

export async function getNextPage() {
  searchParams.set('page', +searchParams.get('page') + 1);
  let nextPageResponse = await axios.get(
    `${BASE_URL}?${searchParams.toString()}`
  );
  return nextPageResponse;
}
