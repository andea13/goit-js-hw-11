import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';
import renderImages from './renderImagesFunc';

export default async function onLoadMoreClick(event) {
  refs.page += 1;
  refs.loadMoreBtnEl.style.display = 'none';

  let q = refs.inputEl.value;
  try {
    const response = await axios.get(
      `${refs.BASE_URL}?key=${refs.key}&q=${q}&imageType=${refs.imageType}&orientation=${refs.orientation}&safesearch=${refs.safesearch}&page=${refs.page}&per_page=40`
    );

    const result = await response.data;
    renderImages(result);
    console.log(result);
    refs.loadMoreBtnEl.style.display = 'block';

    if (result.hits.length < 40) {
      refs.loadMoreBtnEl.style.display = 'none';
      Notiflix.Notify.failure(
        'We are sorry, but you have reached the end of search results.'
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}
